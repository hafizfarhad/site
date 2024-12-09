import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 }; // Correct aspect ratio for OG images
export const alt = 'Hafiz Farhad | Cyber Security Researcher'; // Alt text for accessibility
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function (): Promise<ImageResponse> {
  const fontData = await fetch(
    new URL('./fonts/ChakraPetch-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          letterSpacing: '-0.02em',
          fontWeight: 700,
          background: '#000',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '20px 50px',
          }}
        >
          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              background: 'white',
              color: 'black',
              padding: '4px 10px',
              borderRadius: '5px',
            }}
          >
            hafizfarhad.com
          </span>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0 50px',
            color: 'white',
            textAlign: 'center',
            flex: 1,
            fontSize: 80, // Adjusted to fit better
            maxWidth: 1000,
          }}
        >
          Hafiz Farhad | Cyber Security Researcher
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Chakra Petch',
          data: fontData,
          weight: 500,
        },
      ],
      width: 1200,
      height: 630, // Matches Open Graph recommended size
    }
  );
}
