import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Dashboard() {
    const [fullNews, setFullNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('');
    const today = new Date((new Date()).setHours(0, 0, 0, 0));

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=deloitte&language=en&apiKey=d4071f8f86974438b93a0fd353d3dda0')
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles.slice(0, 15);
                setFullNews(articles);
                const preparedNews = PrepareArticles(articles)
                setFilteredNews(preparedNews);
            });
    }, [])

    PrepareArticles = (news) => {
        let groupedArticles = {};
        news.forEach((article) => {
            const dayDifference = Math.ceil(today.getTime() - new Date(article.publishedAt).getTime() / (1000 * 3600 * 24));
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
        <ScrollView style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 22 }}>{item} {localize('WeekAgo')}</Text>
                        {filteredNews[item].map((article, articleIndex) => {
                            return (
                                <View key={articleIndex + 'articleIndex'} style={{ flex: 1, marginVertical: 5 }}>
                                    <Text style={{ fontSize: 18 }}>{article.title}</Text>
                                    <Text style={{ fontSize: 12 }}>{article.description}</Text>
                                </View>
                            )
                        })}
                    </View>
                )

            })}
        </ScrollView>
    );
}