import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Dashboard() {
    const [fullNews, setFullNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const today = new Date((new Date()).setHours(0, 0, 0, 0));

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=deloitte&language=en&apiKey=d4071f8f86974438b93a0fd353d3dda0')
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles.slice(0, 35);
                setFullNews(articles);
                const preparedNews = PrepareArticles(articles)
                setFilteredNews(preparedNews);
            });
    }, [])

    useEffect(() => {
        if (!isRefreshing) return;
        fetch('https://newsapi.org/v2/everything?q=deloitte&language=en&apiKey=d4071f8f86974438b93a0fd353d3dda0')
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles.slice(0, 35);
                setFullNews(articles);
                const preparedNews = PrepareArticles(articles)
                setFilteredNews(preparedNews);
                setSearchPhrase('');
                setIsRefreshing(false);
            });
    }, [isRefreshing])

    PrepareArticles = (articles) => {
        let groupedArticles = {};
        articles.forEach((article) => {
            const dayDifference = Math.ceil((today.getTime() - new Date(article.publishedAt).getTime()) / (1000 * 3600 * 24));
            const WeekAgo = Math.ceil(dayDifference / 7);
            if (groupedArticles.hasOwnProperty(WeekAgo)) {
                groupedArticles[WeekAgo].push(article)
            } else {
                groupedArticles[WeekAgo] = [article];
            }
        })
        return groupedArticles;
    }

    SearchNews = (searchText) => {
        setSearchPhrase(searchText);
        const searchedNews = fullNews.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredNews(PrepareArticles(searchedNews));
    }

    return (
        <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => { setIsRefreshing(true) }} />}>
            <View style={{
                margin: 8,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
            }}>
                <View style={{
                    padding: 3,
                    flexDirection: "row",
                    width: "95%",
                    backgroundColor: "#d9dbda",
                    borderRadius: 15,
                    alignItems: "center",
                }}>
                    <Icon name="search" size={15} color="black" style={{ marginLeft: 1 }} />
                    <TextInput
                        style={{
                            fontSize: 20,
                            marginLeft: 10,
                            width: "90%",
                        }}
                        placeholder="Search"
                        value={searchPhrase}
                        onChangeText={SearchNews}
                    />
                </View>
            </View>
            {Object.keys(filteredNews).map((item) => {
                return (
                    <View key={item} style={{ flex: 1, margin: 5, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 22, fontWeight: 900, color: 'grey' }}>{item} {localize('WeekAgo')}</Text>
                        {filteredNews[item].map((article, articleIndex) => {
                            return (
                                <View key={articleIndex + 'articleIndex'} style={{ flex: 1, marginVertical: 5 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 800, color: 'black' }}>{article.title}</Text>
                                    <Text style={{ fontSize: 12, marginStart: 10 }}>{article.description}</Text>
                                </View>
                            )
                        })}
                    </View>
                )

            })}
        </ScrollView>
    );
}