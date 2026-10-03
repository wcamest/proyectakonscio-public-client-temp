import { NextResponse } from "next/server";

import {
  PUBLIC_SITE_RELEASE_HEADER,
  PUBLIC_SITE_RELEASE_ID_PATTERN,
} from "../../../../observability-release";

export const dynamic = "force-dynamic";

export function GET() {
  const configured = process.env.NEXT_PUBLIC_APP_RELEASE?.trim() ?? "";
  const release = PUBLIC_SITE_RELEASE_ID_PATTERN.test(configured) ? configured : "unknown";
  return NextResponse.json(
    { release },
    {
      headers: {
        "Cache-Control": "no-store",
        [PUBLIC_SITE_RELEASE_HEADER]: release,
      },
    },
  );
}
