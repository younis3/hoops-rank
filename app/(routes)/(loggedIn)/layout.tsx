import Nav from "@/app/_components/nav/horizontal/Nav";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Nav />
      {children}
    </section>
  );
}
