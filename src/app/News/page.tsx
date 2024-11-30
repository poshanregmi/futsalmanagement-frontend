"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

interface Article {
  urlToImage: string | null;
  title: string;
  description: string;
  content: string;
  url: string;
}

const NewsCard = ({ article }: { article: Article }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg mb-10">
      <Image
        src={article.urlToImage || "/fallback.png"}
        alt={article.title}
        width={250}
        height={250}
        className="w-fit h-64 object-fill"
        unoptimized={true}
      />
      <h3 className="text-xl font-semibold mt-4 mx-4">{article.title}</h3>
      <p className="text-gray-500 mx-4 mb-4">{article.description}</p>
      <p className="text-gray-400 mx-4 mb-4">{article.content}</p>
    </div>
  );
};

const Page = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(newsApiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.articles && data.articles.length > 0) {
          setNews(data.articles);
        } else {
          setError("No news available for the selected criteria.");
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("An error occurred while fetching news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen py-0 px-2 flex flex-col justify-center items-center">
      <Head>
        <title>Sports News</title>
        <meta
          name="description"
          content="A sports news app built with Next.js and TailwindCSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1 flex-col justify-center items-center w-full">
        <h1 className="text-6xl font-bold">Sports News</h1>
        <div className="grid grid-cols-1 gap-4 max-w-7xl mx-auto p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            news.map((article, index) => (
              <Link
                href={article.url}
                key={`${article.url}-${index}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewsCard article={article} />
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;

// // src/app/News/page.tsx
// import React from "react";
// import NewsList from "../components/NewsList";

// const newsArticles = [
//   {
//     id: "1",
//     title: "Breaking News: New Tech Innovations",
//     description: "Latest updates on the tech industry.",
//     imageUrl: "https://via.placeholder.com/300x200.png?text=News+Image+1",
//     newsUrl: "https://example.com/news1",
//   },
//   {
//     id: "2",
//     title: "Sports Update: Local Team Wins Championship",
//     description: "Highlights from the championship game.",
//     imageUrl: "https://via.placeholder.com/300x200.png?text=News+Image+2",
//     newsUrl: "https://example.com/news2",
//   },
//   {
//     id: "3",
//     title: "Weather Alert: Storm Approaching",
//     description: "Stay safe during the upcoming storm.",
//     imageUrl: "https://via.placeholder.com/300x200.png?text=News+Image+3",
//     newsUrl: "https://example.com/news3",
//   },
// ];

// const NewsPage = () => {
//   return (
//     <div>
//       <h1>Latest News</h1>
//       <div className="news-list">
//         {newsArticles.map((article) => (
//           <NewsList
//             key={article.id}
//             title={article.title}
//             description={article.description}
//             imageUrl={article.imageUrl}
//             newsUrl={article.newsUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsPage;
