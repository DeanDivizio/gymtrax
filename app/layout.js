import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata = {
  title: "GymTrax",
  description: "A simple and minimalist workout tracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1>GymTrax</h1>
            <SignInButton></SignInButton>
            </div>
        </SignedOut>
      </body>
    </html>
    </ClerkProvider>
  );
}
