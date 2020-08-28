const getNews = async (url) => {
    const response = await fetch(url);

    const news = await response.json();

    return news;
}