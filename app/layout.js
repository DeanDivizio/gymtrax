import "./globals.css";

export const metadata = {
  title: "GymTrax",
  description: "A simple and minimalist workout tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
