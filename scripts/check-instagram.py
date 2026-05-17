#!/usr/bin/env python3
"""Quick Instagram profile check using a local Instaloader session.

This intentionally reads only the local session cookie file created by
`instaloader --login <user>`. It does not store credentials in the repo.
"""

from __future__ import annotations

import argparse
import json
import pickle
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path


DEFAULT_PROFILE = "merakiarts53"
DEFAULT_LOGIN = "merakiarts53"
WEB_PROFILE_ENDPOINT = "https://www.instagram.com/api/v1/users/web_profile_info/"
WEB_APP_ID = "936619743392459"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/142.0.0.0 Safari/537.36"
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fetch a compact recent-post summary for an Instagram profile."
    )
    parser.add_argument("--profile", default=DEFAULT_PROFILE, help="Instagram username to inspect.")
    parser.add_argument(
        "--login-user",
        default=DEFAULT_LOGIN,
        help="Instaloader session username stored under ~/.config/instaloader/.",
    )
    parser.add_argument("--count", type=int, default=9, help="Number of recent posts to print.")
    parser.add_argument(
        "--out",
        default="tmp/instagram/merakiarts53-latest.json",
        help="Where to write the full response JSON.",
    )
    return parser.parse_args()


def load_session_cookies(login_user: str) -> dict[str, str]:
    session_file = Path.home() / ".config" / "instaloader" / f"session-{login_user}"
    if not session_file.exists():
        raise FileNotFoundError(
            f"Missing Instagram session file: {session_file}\n"
            f"Create it once with: instaloader --login {login_user}"
        )

    with session_file.open("rb") as file:
        cookies = pickle.load(file)

    if not isinstance(cookies, dict) or "sessionid" not in cookies:
        raise ValueError(f"Session file does not look like a valid Instagram session: {session_file}")

    return {str(key): str(value) for key, value in cookies.items()}


def request_profile(profile: str, cookies: dict[str, str]) -> dict:
    query = urllib.parse.urlencode({"username": profile})
    cookie_header = "; ".join(f"{key}={value}" for key, value in cookies.items())
    request = urllib.request.Request(
        f"{WEB_PROFILE_ENDPOINT}?{query}",
        headers={
            "Accept": "*/*",
            "Cookie": cookie_header,
            "Referer": f"https://www.instagram.com/{profile}/",
            "User-Agent": USER_AGENT,
            "X-ASBD-ID": "129477",
            "X-CSRFToken": cookies.get("csrftoken", ""),
            "X-IG-App-ID": WEB_APP_ID,
            "X-Requested-With": "XMLHttpRequest",
        },
    )

    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def caption_preview(node: dict) -> str:
    edges = node.get("edge_media_to_caption", {}).get("edges") or []
    if not edges:
        return ""
    text = edges[0].get("node", {}).get("text", "")
    return " ".join(text.split())[:120]


def main() -> int:
    args = parse_args()

    try:
        cookies = load_session_cookies(args.login_user)
        data = request_profile(args.profile, cookies)
    except Exception as error:  # noqa: BLE001 - CLI should print practical errors.
        print(f"Instagram check failed: {error}", file=sys.stderr)
        return 1

    user = data.get("data", {}).get("user")
    if not user:
        print(f"Instagram check failed: no profile data returned for @{args.profile}", file=sys.stderr)
        return 1

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, indent=2), encoding="utf-8")

    media = user.get("edge_owner_to_timeline_media", {})
    edges = media.get("edges", [])[: args.count]

    print(f"@{user.get('username')} - {media.get('count', 0)} posts")
    print(f"Saved full JSON: {out_path}")
    print()

    for index, edge in enumerate(edges, start=1):
        node = edge.get("node", {})
        shortcode = node.get("shortcode", "")
        post_type = "reel/video" if node.get("is_video") else "post/carousel"
        timestamp = node.get("taken_at_timestamp")
        date = time.strftime("%Y-%m-%d", time.localtime(timestamp)) if timestamp else "unknown-date"
        preview = caption_preview(node) or "[no caption preview]"
        print(f"{index}. {date} {post_type} https://www.instagram.com/p/{shortcode}/")
        print(f"   {preview}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
