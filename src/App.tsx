import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css';

import "./global.css";

const posts = [
    {
        id: 1,
        author: {
            avatarUrl: 'https://github.com/jvdsantos3.png',
            name: 'João Vitor',
            role: 'Web Developer'
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋', },
            { type: 'paragraph', content: 'Me chamo João Vitor e sou Dev Web', },
            { type: 'link', content: 'https://github.com/jvdsantos3', },
        ],
        publishedAt: new Date('2022-05-03 22:00:00'),
    },
    {
        id: 2,
        author: {
            avatarUrl: 'https://github.com/GustavoCassimiro9.png',
            name: 'Gustavo Cassimiro',
            role: 'Tester'
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋', },
            { type: 'paragraph', content: 'Me chamo Gustavo e sou Tester 🚀', },
            { type: 'link', content: 'https://github.com/GustavoCassimiro9', },
        ],
        publishedAt: new Date('2022-05-10 20:00:00'),
    },
    {
        id: 3,
        author: {
            avatarUrl: 'https://github.com/lucasaraujo18.png',
            name: 'Lucas',
            role: 'Desenvolvedor Front-End'
        },
        content: [
            { type: 'paragraph', content: 'Fala galeraa 👋', },
            { type: 'paragraph', content: 'Me chamo Lucas e sou Desenvolvedor Front-End 🚀', },
            { type: 'link', content: 'https://github.com/lucasaraujo18', },
        ],
        publishedAt: new Date('2022-05-10 20:00:00'),
    }
]

export function App() {
    return (
        <div>
            <Header />
    
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map(post => {
                        return (
                            <Post 
                                key={post.id}
                                author={post.author}
                                content={post.content}
                                publishedAt={post.publishedAt}
                            />
                        )
                    })}
                </main>
            </div>
        </div>
    );
}
