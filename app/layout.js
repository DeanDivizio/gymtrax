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
        <SignedOut><SignInButton></SignInButton></SignedOut>
      </body>
    </html>
    </ClerkProvider>
  );
}
