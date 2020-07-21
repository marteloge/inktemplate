import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>InkTemplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Paper card print!</h1>
        <p>
          Find your paper print template for all occations - weddings, birthdays
          or celebrations. Pick a design and provide a list - we will do the
          rest. Invitations, place cards, save the date and much more.
        </p>

        <article>
          <h2>Place cards</h2>
        </article>
        <article>
          <h2>Invitations</h2>
        </article>
        <article>
          <h2>Save the date</h2>
        </article>
        <article>
          <h2>Menus</h2>
        </article>
      </main>

      <footer>
        <span>Copyright</span>
      </footer>
      <style jsx>{``}</style>
      <style jsx global>{``}</style>
    </div>
  );
}
