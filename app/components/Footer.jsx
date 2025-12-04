import Link from "next/link";

export default function Footer(params) {
  const socials = [
 
    {
      href: "https://linkedin.com/",
      name: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
    },
  ];

  const navigation = [
    { name: "Popular", href: "/popular" },
    { name: "Top Rated", href: "/top-rated" },
    { name: "TV Series", href: "/tv" },
    { name: "Genre", href: "/genre" },
    { name: "Search", href: "/search" },
  ];

  return (
    <>
      <footer className="flex lg:flex-row flex-col items-end justify-between lg:gap-28 gap-6 lg:p-10 p-6">
        <div className="basis-1/3 space-y-2">
          <Link
            href="/"
            className="relative lg:text-4xl text-2xl font-black tracking-tighter text-transparent uppercase bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-700 text-dm"
          >
            Supawatch
          </Link>
          <p className="text-neutral-400 font-medium">
            Explore a cinematic universe like never before with our movie site.
          </p>
        </div>
        <div className="basis-1/5 flex items-start justify-between lg:gap-32 w-full">
          <div className="">
            <ul className="space-y-2 font-medium">
              {navigation.map((item, index) => (
                <li
                  key={index}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <Link key={index} href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <ul className="space-y-2 font-medium">
              {socials.map((item, index) => (
                <li
                  key={index}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <Link key={index} href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
