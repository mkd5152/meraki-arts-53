import AppKit
import CoreImage
import CoreImage.CIFilterBuiltins
import Foundation
import ImageIO
import Vision

enum CutoutError: Error {
  case invalidArguments
  case imageLoadFailed(String)
  case renderFailed
  case noForegroundDetected
}

func loadImage(from url: URL) throws -> CGImage {
  guard let nsImage = NSImage(contentsOf: url) else {
    throw CutoutError.imageLoadFailed(url.path)
  }

  var rect = NSRect(origin: .zero, size: nsImage.size)
  guard let cgImage = nsImage.cgImage(forProposedRect: &rect, context: nil, hints: nil) else {
    throw CutoutError.renderFailed
  }

  return cgImage
}

func writePNG(_ image: CIImage, to url: URL, context: CIContext) throws {
  let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!
  try context.writePNGRepresentation(
    of: image,
    to: url,
    format: .RGBA8,
    colorSpace: colorSpace
  )
}

func makeCutout(inputURL: URL, outputURL: URL) throws {
  let context = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
  let cgImage = try loadImage(from: inputURL)
  let image = CIImage(cgImage: cgImage)

  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
  try handler.perform([request])

  guard let observation = request.results?.first else {
    throw CutoutError.noForegroundDetected
  }

  let instances = observation.allInstances
  guard !instances.isEmpty else {
    throw CutoutError.noForegroundDetected
  }

  let maskBuffer = try observation.generateScaledMaskForImage(
    forInstances: instances,
    from: handler
  )

  let maskImage = CIImage(cvPixelBuffer: maskBuffer).cropped(to: image.extent)
  let transparent = CIImage(color: .clear).cropped(to: image.extent)
  let blended = CIFilter.blendWithMask()
  blended.inputImage = image
  blended.backgroundImage = transparent
  blended.maskImage = maskImage

  guard let output = blended.outputImage?.cropped(to: image.extent) else {
    throw CutoutError.renderFailed
  }

  try writePNG(output, to: outputURL, context: context)
}

do {
  guard CommandLine.arguments.count == 3 else {
    throw CutoutError.invalidArguments
  }

  try makeCutout(
    inputURL: URL(fileURLWithPath: CommandLine.arguments[1]),
    outputURL: URL(fileURLWithPath: CommandLine.arguments[2])
  )
} catch {
  fputs("vision-cutout error: \(error)\n", stderr)
  exit(1)
}
