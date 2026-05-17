# AGENTS.md

Standing instructions for Codex and other agents working in this repository.
This file is meant to prevent the user from repeating the same Instagram,
content, image-editing, and Meraki Arts 53 brand preferences every time.

## How To Use This File

- Treat this file as project memory and follow it before doing any work here.
- If the user asks for Instagram posts, carousels, reels, prompts, captions,
  image edits, brand copy, gallery updates, or social content, use the defaults
  below without asking them to repeat the format.
- For Instagram post, carousel, reel, or story requests, quickly check the live
  Meraki Arts 53 Instagram page first and compare the request with recent posts.
  Keep this fast; do not let the check stall the work.
- Before making social content from website/gallery data, check `data/content.json`
  and do not use any service, category, or item whose nearest relevant
  `isVisible` value is `false` unless the user explicitly asks to use hidden
  work.
- Ask a clarifying question only when the missing detail changes the outcome
  materially, such as the exact product, deadline, language, price, offer,
  or image choice.
- When the user asks for something to be made, make it. Do not stop at a plan
  unless they explicitly ask for a plan.
- Keep all outputs copy-paste ready. The user should be able to use captions,
  hashtags, prompts, and slide copy directly.
- Be honest about memory limits: use this file, repo files, and current chat
  context as the reliable source of truth. Do not pretend to know missing facts.
- If the user later corrects a preference, update this file when appropriate.

## Project Snapshot

- Brand: Meraki Arts 53.
- Project folder: Batul atelier / Meraki Arts 53 website and content workspace.
- Positioning: a handmade creative brand for texture art, terrazzo decor,
  canvas paintings, mehendi, lamasa, chenille craft, outline art, textile motif
  studies, and personalized gifts.
- Tagline from `data/content.json`: Texture art, terrazzo decor, canvas
  paintings, and personalized craft.
- Core feel: thoughtful, handmade, polished, warm, detailed, calm, expressive,
  personal, premium but not cold.
- Audience: people looking for personal gifts, decor, occasion pieces,
  bridal/festive mehendi, handmade art, and custom creative work in Pune,
  Chennai, India, and online.
- Instagram: `https://www.instagram.com/merakiarts53/`
- WhatsApp: `https://wa.me/919884262707`

## Visibility Guard

Always check visibility before creating Instagram content from repo data.

- Inspect `data/content.json` for `isVisible`.
- If the requested service, art form, category, product, or page has
  `isVisible: false`, do not create a post for it unless the user explicitly
  says to use hidden work.
- If a child item does not have its own visibility flag, inherit the nearest
  relevant parent visibility.
- Current hidden entries at the time this file was updated: Bridal & Occasion
  Mehendi service, Mehendi art form, and Textile Motif Studies / Rida Design
  art form. Still check the file each time because this can change.
- If the user uploads an image directly, the visibility guard applies only if
  the image is clearly tied to a hidden repo category. Otherwise proceed with
  the uploaded image.

## Brand Assets And Palette

Use the assets and palette already defined in `BRAND-KIT.md` and
`data/content.json`.

Core assets:

- Wordmark: `public/brand/generated/meraki-option4-wordmark.png`
- Dark wordmark: `public/brand/generated/meraki-option4-wordmark-dark.png`
- Mark/badge: `public/brand/generated/meraki-option4-mark.png`
- Social preview lockup: `public/brand/generated/meraki-option4-lockup.png`
- Dark lockup: `public/brand/generated/meraki-option4-lockup-dark.png`

Palette:

- Ink: `#28231f`
- Coral: `#d65f4d`
- Rose: `#df7b80`
- Gold: `#e1a135`
- Sage: `#7d8b68`
- Teal: `#2e7c80`
- Ivory: `#fff8eb`

Visual rule: keep the brand playful but not crowded. Use brush marks, dots,
floral details, and handmade texture as accents, not full busy backgrounds.

## Brand Voice

Default voice:

- Warm, graceful, and practical.
- Handmade and personal, but not overly sentimental.
- Confident without sounding corporate.
- Premium and polished without sounding luxury-cliche.
- Clear enough for customers to understand what to do next.

Write like a small handmade studio that cares about details. Use words like:

- handmade
- custom
- personal
- thoughtful
- detailed
- tactile
- textured
- keepsake
- occasion
- palette
- finish
- crafted
- made with care
- designed around the person
- one-of-a-kind

Avoid:

- generic hype like "best ever", "must have", "unmissable", "viral"
- fake urgency unless there is a real deadline
- overpromising delivery, pricing, or availability
- dense corporate language
- captions that sound like ads before they sound human
- emoji-heavy copy
- excessive all-caps
- long on-image paragraphs
- changing the customer's artwork, names, dates, or personalization unless
  explicitly requested

Use English by default. Add Hindi, Urdu, Arabic, Tamil, or Hinglish only if the
user asks for that language or the campaign clearly requires it.

## Content Formatting Defaults

When giving social media content, use concise labeled sections:

- Concept
- On-image text
- Gemini image prompt for single posts/carousels
- Caption with exactly 5 hashtags
- CTA
- Comment hashtags
- Alt text
- Prompt or design notes, if relevant for reels/stories

If the user asks for multiple options, give 3 strong options by default. If they
ask for "many", give 5 to 10.

Default caption structure:

1. First line: a strong hook or emotional context.
2. Middle: what the piece is, who it is for, material/process/detail.
3. End: clear CTA for DM, WhatsApp, custom order, or saving the post.
4. Add exactly 5 hashtags inside the caption. One of the 5 must be `#art`.

Hashtag split rule:

- Caption always gets exactly 5 hashtags, including `#art`.
- Do not use `#MerakiArts53` in captions or comment hashtags.
- Put every additional hashtag separately under `Comment hashtags` so the user
  can paste them as the first comment.
- This applies to every Instagram post request: single post, carousel, reel,
  story caption, caption-only request, and repost copy.
- Do not put 12 to 20 hashtags directly in the caption anymore.

Default CTA options:

- DM us to plan a custom piece.
- Send the occasion, colors, deadline, and reference photos on WhatsApp.
- Save this for your next handmade gifting idea.
- Message Meraki Arts 53 for custom orders.
- For custom work, share the recipient, occasion, palette, and timeline.

Do not include prices, discounts, shipping claims, delivery timelines, or
availability unless the user provides them.

## Instagram Size Defaults

- Static feed post: 4:5 at 1080 x 1350 when the image can support it.
- Square feed post: 1:1 at 1080 x 1080 when the user wants a grid-safe square
  or when using existing square assets.
- Carousel: 1:1 at 1080 x 1080 by default, especially for grid consistency.
  Use 4:5 if the user asks for portrait carousels or reach-focused formatting.
- Reel: 9:16 at 1080 x 1920.
- Story: 9:16 at 1080 x 1920.
- Current `insta/` working images are 2048 x 2048 PNGs, so square exports are
  acceptable there unless the user requests another format.

## Live Instagram Check

For any Instagram post, carousel, reel, or story request:

- Prefer `npm run instagram:check -- --count 9` for the quick live check. It
  uses the local Instaloader session and writes the full response to
  `tmp/instagram/merakiarts53-latest.json`.
- Quickly open/check `https://www.instagram.com/merakiarts53/`.
- Compare against recent posts for repeated artwork, repeated visual layout,
  repeated hook, caption angle, hashtag pattern, and overall grid feel.
- Use the check to avoid making something too similar to what was just posted.
- Keep this quick. If Instagram is login-gated, blocked, slow, unavailable, or
  cannot be checked within a short attempt, say that the check was blocked and
  continue from repo context.
- If a live comparison is important and Instagram cannot be checked, ask the
  user to upload a screenshot of the current grid/reel/post or the exact image
  they want used.
- Do not stall the task trying to scrape Instagram. Attempt the check, learn
  what is available, then move.

## When The User Asks For An Instagram Post

Assume they want a complete, ready-to-post package.

Before drafting:

- Run the live Instagram check above.
- Run the visibility guard above if choosing from repo categories or gallery
  items.
- If the post depends on a specific image and none is available or Instagram
  cannot be inspected, ask the user to upload the image.

Deliver:

- A short creative direction.
- On-image text, usually 3 to 8 words.
- A fancy Gemini-ready image prompt the user can paste into Gemini.
- A polished caption.
- A CTA.
- Exactly 5 in-caption hashtags, including `#art`.
- Remaining hashtags separately as `Comment hashtags`.
- Alt text for accessibility.
- Do not design or generate the final single-post image yourself unless the user
  explicitly asks for image generation/editing. By default, provide the Gemini
  prompt and let the user create the image in Gemini.

Default single-post strategy:

- Lead with the finished artwork or product.
- Use one clear hook, not several competing messages.
- Keep on-image text minimal and readable on a phone.
- Let material detail, color, and finish carry the visual.
- Use the caption to explain occasion, personalization, and order flow.

Good post angles:

- Finished piece reveal.
- Close-up detail appreciation.
- Before/after or reference-to-result.
- Gift idea for a specific occasion.
- Material/process story.
- Customer-ready custom order prompt.
- Category education: what to share before ordering.

Default output format:

```text
Concept:
...

On-image text:
...

Gemini image prompt:
...

Caption:
...

CTA:
...

Comment hashtags:
...

Alt text:
...
```

## When The User Asks For A Carousel

Assume they want a slide-by-slide carousel plan and a fancy Gemini-ready prompt,
not a finished designed carousel image. Do not design or generate the final
carousel yourself unless the user explicitly asks for image generation/editing.

Before drafting:

- Run the live Instagram check above.
- Run the visibility guard above if choosing from repo categories or gallery
  items.

Default carousel length: 5 to 7 slides.

Default story arc:

1. Hook / finished reveal.
2. What the piece is.
3. Detail or process close-up.
4. Personalization, material, or occasion context.
5. Why it works as a gift/decor/occasion piece.
6. How to order or what to share.
7. CTA / final brand slide.

If only 5 slides are needed:

1. Hook.
2. Finished piece.
3. Details/process.
4. Customization or use case.
5. CTA.

Carousel copy rules:

- Slide headline: ideally under 8 words, but treat this as manual overlay/copy
  guidance, not text that Gemini should render inside the image.
- Supporting text: ideally under 18 words, but keep it outside the generated
  image unless the user explicitly asks for text in the image.
- No paragraph-heavy slides.
- Each slide should have one job.
- Use visual hierarchy: big artwork and clean negative space for manual text
  editing later.
- Use brand palette with ivory/ink as the base and coral, rose, gold, sage, or
  teal as accents.
- Include a final CTA slide with DM/WhatsApp order flow.
- Default carousel image prompts should not generate text inside slides 1
  through the second-last slide. The final CTA slide may include one short CTA.

Default carousel output format:

```text
Carousel concept:
...

Slides:
1. [Slide title]
   Text: ...
   Visual: ...
   Design note: ...

Gemini single-slide prompts:
...

Caption:
...

Comment hashtags:
...

Alt text:
...
```

The Gemini carousel prompts should be separate one-slide prompts. Do not ask
Gemini to generate the full carousel in one prompt, because that can create a
PowerPoint-style collage or presentation slide. Each prompt should include:

- square 1:1 aspect ratio
- the exact slide number and any slide copy as manual-overlay notes only
- brand colors
- typography direction only for the final CTA slide, unless the user explicitly
  asks for generated text
- that single slide's visual idea
- layout rules
- negative prompt to avoid generated overlay text, unreadable text, clutter,
  random hands, fake logos, distorted products, PowerPoint/presentation
  layouts, multiple slides in one image, and incorrect spelling

## When The User Asks For A Reel

Assume vertical 9:16, short, handmade-process focused. Follow the user's saved
reel generation process unless they give different settings.

Default reel generation settings:

- Seed: `98754321`
- Output videos: `4`
- Aspect ratio: `9:16`
- Resolution: `1080p`
- Generate audio: `Yes`
- Video duration: `8` seconds
- Start frame: required, JPEG/JPG/PNG, max 20 MB
- End frame: optional, JPEG/JPG/PNG, max 20 MB

Before drafting:

- Run the live Instagram check above.
- Run the visibility guard above if choosing from repo categories or gallery
  items.
- If no suitable start frame exists, ask the user to upload an image or create
  a polished start-frame image from the available reference if image generation
  or editing tools are available.

Default length: 8 seconds.

Default pacing:

- 0-1s: hook or most satisfying visual.
- 1-3s: process, texture, material, or close-up detail.
- 3-6s: reveal, styling, or finished piece.
- 6-8s: final beauty shot with no generated text or logo.

Default reel deliverables:

- Filled prompt settings.
- Image details showing exactly where to get the start/end images from, including
  local repo paths, public paths, category, caption/title, and visibility status
  when available.
- A first-step 9:16 image edit prompt for the source picture before the Veo
  prompt. Tell the user to clean, crop, or extend the background in a way the
  source can support, make it aesthetic and Instagram-worthy, preserve the exact
  artwork/product/decor, and use the edited 9:16 image as the Veo start frame.
- Start-frame image or start-frame image prompt.
- Optional end-frame image or end-frame image prompt when useful.
- Concept.
- Manual hook line to add while posting. Keep this outside the Veo prompt so
  the generated video itself still has no text. Make it catchy and youth-facing
  when appropriate. Vary the style across a weekly set: use at most one `POV:`
  hook unless the user asks for more, and mix in trend-style observations,
  emotional hooks, direct one-liners, and save-worthy lines.
- Shot list with timestamps.
- On-screen text: none inside the AI-generated reel. Do not include generated
  titles, captions, subtitles, labels, or typography in Veo prompts unless the
  user explicitly asks for manual overlay copy separately.
- Voiceover if useful.
- Caption with exactly 5 hashtags, including `#art`.
- Remaining hashtags separately as `Comment hashtags`.
- Audio mood.
- Editing notes.

Default reel output format:

```text
Prompt settings:
Seed: 98754321
Output videos: 4
Aspect ratio: 9:16
Resolution: 1080p
Generate audio: Yes
Video duration: 8 seconds
Start frame: [file/image direction]
End frame: [optional file/image direction]

Image details:
Start frame source: [local path or upload instruction]
Public/web image: [public path if available]
Category: [...]
Caption/title: [...]
Visibility: [visible/hidden/unknown]
End frame source: [local path, generated frame, or optional]

Manual hook line to add while posting:
...

Reel concept:
...

Start frame:
...

End frame:
...

Shot list:
0.0-1.0s: ...
1.0-3.0s: ...
3.0-6.0s: ...
6.0-8.0s: ...

On-screen text:
None inside the generated video. No titles, captions, subtitles, labels,
typography, or generated words.

Caption:
...

Audio mood:
...

Comment hashtags:
...
```

Good reel shot ideas:

- Macro texture or brush detail.
- Hands placing materials.
- Paint, paste, foil, beads, flowers, or tray details.
- Slow pan over finished work.
- Satisfying peel/reveal/placement moment.
- Before-to-after transition.
- Packing or gift-ready finishing.
- Final styled shot without generated text, logo, or wordmark.

Avoid:

- long intro screens
- too much text
- generic stock footage
- distorted hands
- changing the artwork
- fake extra products not present in the source
- any AI-generated text inside the video unless the user explicitly asks for it

## When The User Asks For A Reel Prompt

Return a prompt that can be pasted into an AI video or editing tool. Include
scene direction, motion, lighting, camera language, duration, and a negative
prompt.

Also fill the saved prompt settings for the user and provide the needed still
frames. Create/provide actual start-frame and optional end-frame images whenever
a source image and image tool are available. If blocked by a missing source
image, missing tool, or unclear product, ask the user to upload the image and
provide exact image prompts for both frames in the meantime.

For Veo prompts specifically:

- Use separate sections so the user can copy/paste easily.
- Keep `Prompt settings` separate from the actual prompt.
- Include `Image details` before the prompt so the user knows where to get or
  upload the images.
- Put the full Veo prompt in one single contiguous `Veo prompt` copy block. Do
  not split the actual prompt into separate blocks outside that section.
- The `Veo prompt` block itself may include scene, camera, timing, audio mood,
  and negative instructions, but all of that must stay inside the one prompt
  block.
- Do not include on-screen text in the Veo prompt. Keep captions and hashtags
  outside the video prompt for the Instagram post copy only.
- Provide one catchy manual hook line outside the Veo prompt for the user to
  add while posting. This hook is not part of the video generation prompt.
- Do not wrap prompt settings, image details, and the Veo prompt inside one
  combined code block. The prompt must be easy to copy by itself.

Default reel prompt structure:

```text
Prompt settings:
Seed: 98754321
Output videos: 4
Aspect ratio: 9:16
Resolution: 1080p
Generate audio: Yes
Video duration: 8 seconds
Start frame: [upload/use generated image]
End frame: [optional upload/use generated image]
```

```text
Image details:
Start frame source: [local repo path, public path, or upload instruction]
Start frame description: [...]
End frame source: [optional local repo path, generated reveal frame, or none]
End frame description: [...]
Category: [...]
Caption/title: [...]
Visibility: [visible/hidden/unknown]
```

```text
Veo prompt:
Create an 8-second 9:16 vertical Instagram Reel for Meraki Arts 53.
Use the provided artwork/product as the exact reference. Preserve its colors,
shape, materials, and handmade imperfections. Preserve any real text that is
physically part of the product only when the user explicitly wants it preserved.
Show [scene].
Lighting: soft natural light. Style: warm, polished handmade studio.
Camera: macro close-ups, gentle pans, smooth reveal.

Scene prompts:
1. ...
2. ...
3. ...

On-screen text:
None. Do not generate titles, captions, subtitles, labels, typography, logos,
or any written words inside the video.

Negative prompt:
Do not alter the artwork, do not change names or dates, no fake logos,
no warped hands, no extra fingers, no distorted product edges, no captions,
no subtitles, no labels, no generated words, no unreadable text, no cluttered
background, no plastic-looking surfaces, no over-smoothing.
```

```text
Caption:
...

Comment hashtags:
...
```

If the user supplies an image, tell the tool to use it as the exact reference.
If the user does not supply an image, use the relevant category style and ask
for the actual image only if a faithful product reel is impossible without it.

For Veo reel prompts, always use this two-step image flow:

1. First provide a 9:16 image edit prompt for the source image. The edit prompt
   should clean the original background or messy room, create a polished Meraki
   Arts 53 presentation when the source can support it, preserve the exact
   product or decor, avoid private text, and leave mobile-safe negative space.
   For fragile room/decor photos, use crop/cleanup/blurred-duplicate fill
   instead of background replacement.
2. Then write the Veo prompt telling the model to use the edited 9:16 image as
   the exact start-frame reference. Do not ask Veo to reinterpret the raw photo.
3. If an end frame is useful, provide a second 9:16 edit prompt or tell the user
   to make a wider reveal variant from the same edited image. Do not do this for
   fragile room/decor photos where expansion would change the setup; use the
   same preserved frame instead.

## When The User Asks For A Carousel Prompt

Return a prompt for generating or designing a multi-slide carousel.

Default prompt requirements:

- Square 1:1 unless asked otherwise.
- First provide a 1:1 image edit prompt for the main reference picture. The
  prompt should remove the original background, clean clutter, place the product
  or artwork on a warm ivory premium studio surface, preserve exact details, and
  avoid extra text/logos/props unless requested.
- If the carousel is informational and has no product photo, first provide a
  1:1 generated reference/cover image prompt that establishes the visual style.
- If the carousel is educational, instructional, or has no reference/product
  image, generated slide text is allowed and usually expected. Keep the text
  short, useful, and easy to read. The "no text except final CTA" rule applies
  to image-provided product/reference carousels, not educational carousels.
- Then write one Gemini prompt per carousel slide and tell Gemini to use the
  edited 1:1 image as the exact product/reference image where relevant.
- When the user provides an image for a carousel, every image-based slide must
  strictly use that attached/edited image as the exact reference. Do not invent,
  replace, substitute, redraw, or "upgrade" it into a generic product. Name the
  specific object that must not be replaced, such as "do not turn this treat
  pouch into a shopping bag or gift bag."
- For image-based carousel prompts, keep the prompt simple and product-photo
  oriented. Use the user's proven style:
  "Use the attached image as the exact product reference. Create a square 1:1
  [hero/close-up/macro/top-angle/imaginative/final CTA] image of the same
  [product]..." Then describe the shot and list the exact details to preserve.
  Avoid long defensive prompt soup unless fixing a specific failure.
- A strong image-based carousel sequence is: full hero shot, close-up of the
  key detail, macro material/detail shot, top-angle or diagonal editorial shot,
  one imaginative but realistic product photo, and final CTA slide.
- For image-provided product/reference carousels, do not put generated/overlay
  text inside slide images except on the final CTA slide, unless the user
  explicitly asks otherwise. Slide 1 through the second-last slide should be
  visual-only. Preserve real text that is physically printed on the product only
  if the user wants the reference preserved; do not rewrite it.
- For image-provided product/reference carousels, the final CTA slide only may
  render one short CTA as text. For educational/instructional carousels, short
  useful text may appear on every slide.
- Never ask Gemini to generate all carousel slides in one prompt. Use separate
  prompts labeled Slide 1, Slide 2, etc.
- Use Meraki Arts 53 palette.
- Use handmade texture, dot, brush, or floral accents sparingly.
- Keep product/artwork as the visual hero.
- When a slide intentionally includes text, keep it sharp, spelled correctly,
  and inside safe margins.
- Use a consistent layout system across all slides.
- End with a CTA slide.

Default negative prompt:

```text
No cluttered backgrounds, no random decorative overload, no unreadable text,
no misspelled words, no fake watermarks, no distorted product, no altered
customer names/dates, no AI-looking hands, no harsh shadows, no heavy blur,
no generic stock-photo mood.
```

## When The User Asks For Captions

Give caption options that are ready for Instagram.

Default: provide 3 caption options unless the user asks for one.
Each option must include exactly 5 hashtags in the caption, and one must be
`#art`. Put all additional hashtags separately under `Comment hashtags`.

Caption option types:

- Warm and personal.
- Short and polished.
- Sales/CTA focused.

For a single final caption, use:

```text
[Hook]

[What it is and what makes it personal]

[CTA]

[#art plus 4 relevant hashtags]
```

Keep captions natural. Do not make every caption sound like:
"Every piece tells a story." That line is too generic if repeated.

## Hashtag Defaults

For every Instagram post, use exactly 5 hashtags in the caption, including
`#art`. Put the remaining relevant hashtags separately as `Comment hashtags`
for the user to paste as the first comment. The comment hashtag set can usually
be 8 to 15 hashtags. Mix brand, category, handmade, location, and intent.
Do not overload with 30 repetitive tags unless asked.

Core hashtags:

- #HandmadeByMeraki
- #HandmadeInIndia
- #IndianHandmade
- #CustomMade
- #HandmadeGifts
- #PersonalizedGifts
- #ArtAndCraft
- #SmallBusinessIndia

Location hashtags:

- #PuneHandmade
- #PuneArtist
- #PuneGifts
- #ChennaiArtist
- #ChennaiHandmade
- #IndiaArtists

Category hashtags:

- Texture art: #TextureArt #WallArtIndia #FloralTextureArt #HandmadeWallArt
- Terrazzo: #TerrazzoDecor #HandmadeTray #HomeDecorIndia
- Mehendi: #MehendiDesign #HennaDesign #BridalMehendi #FestiveMehendi
- Customized gifts: #CustomizedGifts #PersonalizedKeepsake #BirthdayGiftIdeas
- Lamasa: #LamasaArt #HandmadeDecor #MiniatureDecor
- Paintings: #CanvasPainting #OriginalArtwork #HandPainted
- Chenille craft: #ChenilleCraft #HandmadeFlowers #CraftDecor
- Outline art: #OutlineArt #FloralArt #LineArtDecor
- Textile motifs: #TextileDesign #RidaDesign #FloralMotifs

Choose the most relevant set. Do not include every hashtag in every post.

## Category Playbooks

Texture Art:

- Emphasize relief, dimension, tactile detail, light, shadow, wall decor,
  floral texture, and meaningful statement pieces.
- Good hooks: "Texture you can almost feel", "A wall piece with quiet depth",
  "Florals, but sculpted".

Terrazzo:

- Emphasize modern handmade decor, trays, shelf styling, desk styling,
  housewarming gifts, and polished surfaces.
- Good hooks: "A handmade tray with a modern finish", "Small decor, big detail".

Mehendi:

- Emphasize graceful spacing, balanced lines, bridal/festive occasions,
  hands/arms, and elegant custom patterns.
- Avoid claiming "bridal expert" unless the user asks for that positioning.
- Good hooks: "Graceful lines for a festive hand", "Intricate, but still airy".

Customized Gifts:

- Emphasize the recipient, occasion, message, theme, colors, dates, photos,
  and keepsake value.
- Good hooks: "Made around their moment", "A gift that knows their story",
  "Personal details, handmade finish".

Lamasa:

- Emphasize miniature details, trinket trays, soft color, themed objects,
  handmade decor, and charming display pieces.
- Good hooks: "Tiny details, handmade charm", "A little tray with a lot of care".

Paintings:

- Emphasize mood, color, portrait studies, florals, wall decor, personal gifts,
  and original hand-painted work.
- Good hooks: "Painted for mood, color, and memory", "A handmade piece for the wall".

Chenille Craft:

- Emphasize soft sculptural florals, stems, keepsakes, playful gifting,
  desk decor, and birthday details.
- Good hooks: "Soft florals that stay", "A playful handmade stem".

Outline Art:

- Emphasize clean floral shapes, lace-inspired borders, motif detail,
  keepsakes, and refined panels.
- Good hooks: "Clean lines, floral detail", "A lace-inspired handmade panel".

Textile Motif Studies / Rida Design:

- Emphasize refined borders, wearable motifs, floral studies, festive accents,
  and gentle customization.
- Good hooks: "A motif designed to sit softly on fabric", "Floral detail for a festive edge".

## Editing Pictures

When the user asks to edit pictures, improve them, clean them, make them
Instagram-ready, remove background, crop, enhance, or create presentation
images, prioritize preserving the actual artwork.

Default behavior for image edits:

- For simple isolated products, remove the background first unless the user
  explicitly says to keep it.
- For fragile real-scene references such as room decor, thin strings, hanging
  hearts, balloons, fairy lights, flowers, or transparent/fine details, do not
  force a full background removal if it will make the model rebuild the object.
  Prefer faithful crop, cleanup, distraction removal, and background extension
  from the original photo.
- Make the image more fancy/premium with a polished Meraki Arts 53 presentation:
  clean ivory/brand-color background, soft natural shadow, subtle texture,
  tasteful accent details, and better crop/composition.
- Do not disrupt, redraw, recolor, resize, replace, or reinterpret the actual
  contents of the image.

Always preserve:

- artwork shape
- colors as much as possible
- names, dates, numbers, initials, and written personalization
- handmade texture and natural imperfections
- material identity
- proportions

Allowed edits by default:

- remove the background and create a clean cutout
- crop and straighten
- correct exposure and white balance
- reduce harsh shadows
- clean dust, marks, and background distractions
- improve sharpness lightly
- remove clutter around the product
- isolate the item on a clean background
- extend a background for Instagram ratio if it does not alter the item
- add subtle shadow if needed for grounding
- add discreet Meraki Arts 53 branding when requested

Do not:

- redraw the artwork into a different design
- change customer names, messages, dates, or photos
- make handmade work look plastic or AI-smooth
- add random props that change the meaning of the piece
- crop out important details unless the user requested a tight detail crop
- use dark, blurry, generic stock-style backgrounds for products that need to
  be inspected

Default editing deliverables:

- transparent-background cutout when feasible
- fancy Meraki Arts 53 presentation image
- high-quality edited master
- Instagram square crop if needed
- Instagram 4:5 crop if useful
- optional story/reel crop for vertical use

If working inside this repo:

- Raw images live in `creations/`, which is ignored by git.
- New raw files should go in `creations/_inbox/existing/<category>/` or
  `creations/_inbox/new/<category>/`.
- Finished web-ready images live in `public/images/<category>/`.
- Instagram working assets can live in `insta/`.
- Follow `IMAGE-WORKFLOW.md` when processing the image inbox.
- Use `npm run images:check-inbox` to inspect waiting image files.

## Image Generation And Editing Prompts

When writing prompts for generated visuals, include:

- subject
- category
- exact aspect ratio
- composition
- background
- lighting
- camera angle
- material texture
- brand palette
- text instructions
- what must not change
- negative prompt

Default visual style:

- soft natural light
- warm ivory or neutral background
- clear product focus
- handmade texture visible
- polished but not sterile
- gentle accents from the brand palette
- minimal props
- enough negative space for text when needed

Never rely on generated text inside an image unless the tool is known to render
text correctly. Prefer adding text in design/editing software after image
generation.

For Instagram prompt packs, always include image-prep prompts before the final
Gemini/Veo prompts:

- For reels, create a 9:16 mobile start-frame edit prompt first. It should
  clean/crop/extend the messy background, make the frame aesthetic and premium,
  preserve the actual artwork/product/decor, and explicitly say no
  hallucinated objects, no altered handwriting/details, no extra people, and no
  logos.
- For real reference photos, especially room decor with thin strings, balloons,
  flowers, hanging pieces, or other fragile details, never use language like
  "recreate the decor" or "redesign the scene." Say "photo edit of the original
  image only." Preserve object count, positions, spacing, colors, string
  lengths, proportions, and handmade imperfections. Prefer crop, cleanup, and
  background extension over asking the model to build a new clean scene.
- If the source is a wide landscape room/decor photo that must become a 9:16
  Reel frame, prefer a preserved-photo layout: place the original photo as the
  main visible layer and use a blurred/brightened duplicate of the same photo as
  the vertical background fill. Do not ask AI to replace the room, make a studio
  version, or expand the decor into a new vertical scene.
- Reel prompts should default to no on-screen text at all. Do not include
  generated titles, captions, subtitles, labels, typography, logos, or written
  words inside the video prompt unless the user explicitly asks for manual
  overlay copy.
- For carousels, create a 1:1 square product/reference image prompt first. It
  should remove the original background, isolate the item, place it on a clean
  warm ivory handmade-paper/studio surface, and preserve exact details.
- When a carousel uses a provided product/reference image, the slide prompts
  must say to use that exact image and must explicitly forbid substituting a
  generic version of the object.
- Carousel slide image prompts should be visual-only until the final CTA slide:
  no generated headlines, paragraphs, labels, logos, watermarks, or new words.
  The final CTA slide may contain one short CTA.
- The final Veo/Gemini prompt must say to use the edited image as the exact
  reference. This is the default way to reduce hallucinations and keep the final
  Reel or carousel faithful.
- For privacy-sensitive custom gifts, the image-prep prompt must crop, remove,
  blur, or avoid names, faces, private notes, dates, and personal photos unless
  the user explicitly asks to preserve them.

## Prompt Templates

Gemini static post image prompt:

```text
Create a [1:1 square / 4:5 portrait] Instagram post for Meraki Arts 53,
a handmade creative brand. Feature [artwork/product/category] as the hero.
Style: warm handmade studio, soft natural light, ivory background, subtle
Meraki palette accents in coral, rose, gold, sage, and teal. Keep the artwork
faithful to the reference. Leave clean space for the text: "[on-image text]".
Make it polished, elegant, and personal, not crowded.

Negative prompt: no altered artwork, no misspelled text, no random logo,
no distorted hands, no extra objects covering the piece, no heavy blur,
no harsh shadows, no over-smoothed plastic finish.
```

Gemini carousel design prompt:

```text
Use the attached image as the exact product reference. Create a square 1:1
Instagram carousel image of the same [product] as the hero. [Describe one clear
shot: full hero / close-up / macro detail / top-angle / imaginative realistic
product photo.] Preserve [specific product details] exactly. Soft natural
light, warm ivory handmade-paper background, premium handmade mood, calm
negative space. No added text, no logo, no people, no extra props, no redesign,
no altered writing, no generic substitute product, no distorted product.
```

Reel prompt:

```text
Create a 9:16 Instagram Reel for Meraki Arts 53, [duration] seconds.
Use the provided product/artwork as the exact visual reference and preserve
all handmade details. Show macro close-ups, gentle hand process shots, and a
final reveal in soft natural light. Camera movement should be smooth: slow pan,
close detail, reveal, final styled shot. Mood: warm, polished, handmade,
personal.

On-screen text:
None. Do not generate titles, captions, subtitles, labels, typography, logos,
or any written words inside the video.

Negative prompt: no altered artwork, no distorted hands, no extra fingers,
no incorrect names/dates, no fake logos, no captions, no subtitles, no labels,
no generated words, no unreadable text, no cluttered background, no heavy blur,
no plastic finish.
```

## Ordering And Inquiry Copy

When creating order-focused copy, ask customers to share:

- occasion
- recipient
- preferred medium/category
- colors or palette
- size
- deadline
- budget range, if relevant
- reference photos
- personalization text
- delivery or handover location

Default inquiry CTA:

```text
To plan a custom piece, send the occasion, recipient, colors, deadline,
and any reference photos on DM or WhatsApp.
```

Do not promise exact delivery timing unless the user provides it.

## Local Repo Workflow

Useful commands:

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run instagram:check -- --count 9`
- `npm run images:check-inbox`
- `npm run images:check-parity`

Important files:

- Brand kit: `BRAND-KIT.md`
- Image workflow: `IMAGE-WORKFLOW.md`
- Main content: `data/content.json`
- Image inbox: `creations/_inbox/`
- Public gallery assets: `public/images/`
- Brand assets: `public/brand/generated/`
- Instagram working assets: `insta/`

When editing the website:

- Follow the existing Next.js, React, TypeScript, and Tailwind patterns.
- Keep changes scoped to the user's request.
- Preserve existing user changes.
- Update `data/content.json` for content/gallery changes.
- Run `npm run typecheck` or `npm run build` when code changes warrant it.

When processing images:

- Read `IMAGE-WORKFLOW.md` first.
- Keep originals organized in `creations/segregated/<category>/`.
- Export optimized `.webp` files into `public/images/<category>/`.
- Update captions, alt text, cover images, gallery entries, and picture IDs.
- Run image checks and build/type checks when relevant.

## Quality Checklist Before Replying

For social content:

- Does the first line hook the right audience?
- Is the caption specific to the artwork/category?
- Is the CTA clear?
- Does the caption include exactly 5 hashtags with `#art` included?
- Are the remaining hashtags separated under `Comment hashtags` and not bloated?
- Is the on-image text short enough to read on a phone?
- Did we avoid invented prices, discounts, or timelines?

For carousels:

- Does each slide have one job?
- Is slide text short?
- Does the final slide tell people what to do next?
- Is the design direction consistent with Meraki Arts 53?

For reels:

- Does the first second have motion or detail?
- Is the reveal early enough?
- Are overlay lines short?
- Is there a clear final CTA?

For image edits:

- Is the artwork preserved?
- Are personalization details unchanged?
- Is the crop useful for Instagram?
- Does it still feel handmade?

For repo changes:

- Are changed files limited to the request?
- Did relevant checks run?
- Did the final reply mention what changed and any checks that could not run?
