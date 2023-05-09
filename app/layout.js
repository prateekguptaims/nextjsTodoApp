import "../styles/app.scss";
import { ContextProvider } from "@/components/Clients";

import Header from "./header";
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">

      <body>
        <ContextProvider>
          <>
          <Header/>
        
        {children}
          </>
        </ContextProvider>
        </body>
    </html>
  )
}
