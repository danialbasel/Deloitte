import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, RefreshControl, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import localize from '../localization/localizer';

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
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => { setIsRefreshing(true) }} />}>
            <View style={styles.searchContainer}>
                <View style={styles.searchView}>
                    <Icon name="search" size={15} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchTextInput}
                        placeholder="Search"
                        value={searchPhrase}
                        onChangeText={SearchNews}
                    />
                </View>
            </View>
            {Object.keys(filteredNews).map((item) => {
                return (
                    <View key={item} style={styles.groupedArticles}>
                        <Text style={styles.groupedArticlesLabel}>{item} {localize('WeekAgo')}</Text>
                        {filteredNews[item].map((article, articleIndex) => {
                            return (
                                <View key={articleIndex + 'articleIndex'} style={styles.articleView}>
                                    <Text style={styles.articleTitle}>{article.title}</Text>
                                    <Text style={styles.articleDescription}>{article.description}</Text>
                                </View>
                            )
                        })}
                    </View>
                )

            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        margin: 8,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    searchView: {
        padding: 3,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#D9DBDA",
        borderRadius: 15,
        alignItems: "center",
    },
    searchIcon: {
        marginLeft: 1,
    },
    searchTextInput: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    groupedArticles: {
        flex: 1,
        margin: 5,
        borderBottomWidth: 1,
    },
    groupedArticlesLabel: {
        fontSize: 22,
        fontWeight: 900,
        color: 'grey',
    },
    articleView: {
        flex: 1,
        marginVertical: 5,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 800,
        color: 'black',
    },
    articleDescription: {
        fontSize: 12,
        marginStart: 10,
    },
})