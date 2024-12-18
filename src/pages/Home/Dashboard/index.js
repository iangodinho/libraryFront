import React, { useEffect, useState } from "react";
import CardPost from "../../../components/cardPost/CardPost";

const fetchPostsFromBackend = async (token) => {
  try {
    const response = await fetch("http://localhost:8080/post", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar posts");
    }

    const result = await response.json();
    return result.content;
  } catch (error) {
    console.error("Erro ao buscar posts do backend:", error);
    return null; 
  }
};

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      const fetchedPosts = await fetchPostsFromBackend(token);

      if (fetchedPosts) {
        setPosts(fetchedPosts);
      } else {
        setError("Não foi possível carregar os posts.");
      }
      
      setLoading(false);
    };

    loadPosts();
  }, [token]);

  if (loading) return <p>Carregando posts...</p>;

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel principal.</p>
      </div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          {posts.length > 0 ? (
            posts.map((data, index) => {
              const { title, content } = data;
              return <CardPost key={index} title={title} content={content} />;
            })
          ) : (
            <p>Nenhum post encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
