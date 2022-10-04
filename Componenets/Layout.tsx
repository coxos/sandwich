import Head from "next/head";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>JANI&apos;S sandwich</title>
        <meta name="description" content="Best Sandwiches in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
