import React from "react";
import {
  Calendar,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";
import { fetchCryptoNews, fetchEducationalContent } from "../../api";

export default function Learn() {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("latest");

  const categorizeContent = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    if (
      text.includes("beginner") ||
      text.includes("guide") ||
      text.includes("how to") ||
      text.includes("tutorial")
    ) {
      return "beginner";
    } else if (
      text.includes("analysis") ||
      text.includes("market") ||
      text.includes("trading")
    ) {
      return "analysis";
    } else if (
      text.includes("technology") ||
      text.includes("blockchain") ||
      text.includes("defi")
    ) {
      return "technology";
    } else if (
      text.includes("regulation") ||
      text.includes("legal") ||
      text.includes("government")
    ) {
      return "regulatory";
    }
    return "general";
  };

  React.useEffect(() => {
    async function getNews() {
      try {
        setLoading(true);
        const [newsArticle, educationalContent] = await Promise.all([
          fetchCryptoNews(),
          fetchEducationalContent(),
        ]);
        const allContent = [
          ...newsArticle.map((article) => ({
            ...article,
            category: "news",
            type: categorizeContent(article.title, article.description),
          })),
          ...educationalContent.map((article) => ({
            ...article,
            category: "education",
            type: "educational",
          })),
        ];
        setNews(allContent);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news articles");
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    getNews();

    const interval = setInterval(getNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filterContent = (content) => {
    switch (activeTab) {
      case "beginner":
        return content.filter((item) => item.type === "beginner");
      case "analysis":
        return content.filter((item) => item.type === "analysis");
      case "technology":
        return content.filter((item) => item.type === "technology");
      case "regulatory":
        return content.filter((item) => item.type === "regulatory");
      default:
        return content;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "beginner":
        return <BookOpen className="w-4 h-4 text-green-400" />;
      case "analysis":
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case "technology":
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <ExternalLink className="w-4 h-4 text-gray-400" />;
    }
  };

  if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Learn Crypto</h1>
          <div className="bg-red-900 border border-red-700 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Learn Cryptocurrency</h1>
          <p className="text-xl text-blue-100">
            Stay updated with the latest crypto news, educational content, and
            market insights
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-700">
          {[
            { id: "latest", label: "Latest", count: news.length },
            {
              id: "beginner",
              label: "Beginner Guides",
              count: news.filter((n) => n.type === "beginner").length,
            },
            {
              id: "analysis",
              label: "Market Analysis",
              count: news.filter((n) => n.type === "analysis").length,
            },
            {
              id: "technology",
              label: "Technology",
              count: news.filter((n) => n.type === "technology").length,
            },
            {
              id: "regulatory",
              label: "Regulatory",
              count: news.filter((n) => n.type === "regulatory").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-800 text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">Loading educational content...</div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filterContent(news)
              .slice(0, 20)
              .map((article, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(article.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            article.type === "beginner"
                              ? "bg-green-900 text-green-300"
                              : article.type === "analysis"
                                ? "bg-blue-900 text-blue-300"
                                : article.type === "technology"
                                  ? "bg-purple-900 text-purple-300"
                                  : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {article.type}
                        </span>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 cursor-pointer">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </h3>

                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {article.source?.name}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Read more <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-lg mt-4"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
