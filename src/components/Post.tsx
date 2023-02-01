import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
};

interface Content {
    type: 'paragraph' | 'link';
    content: string;
};

interface PostPorps {
    author: Author;
    publishedAt: Date;
    content: Content[];
};

export function Post({ author, publishedAt, content }: PostPorps) {
    const [comments, setComments] = useState([]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewcommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: String) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0;
    console.log(newCommentText);

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time 
                    title={publishedDateFormatted} 
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={ styles.content }>
                {content.map(line => {
                    if(line.type == 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if(line.type == 'link') {
                        return <p key={line.content}><a href={line.content} target="_blank">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewcommentInvalid}
                    name='comment' 
                    placeholder='Deixe um comentário' 
                    value={newCommentText}
                    required
                />

                <footer>
                    <button 
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    )
}
