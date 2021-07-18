import React, { useState, useRef, useCallback } from 'react'
import posts from './posts';

import './App.css';

export default function App() {
    //initial limit to load 10 posts at the beginning
    const [limitParam, setLimitParam] = useState(10);
    const { loading, error, postList, hasMore } = posts(limitParam);

    
    const observer  = useRef();

    //to get the last element of the previous call
    const lastPostElementRef = useCallback(node => {
        if(loading){ return; }

        if(observer.current ) { observer.current.disconnect(); }

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                //to get next 10 posts after scroll
                setLimitParam(prevPostList => prevPostList + 10);
            }
        });

        if(node) { observer.current.observe(node); }
    }, [loading, hasMore]);

    return (
        <>
            <div className="container">
                <h1>Posts</h1>
                <div className="flex-container" >  
                {
                    postList.map((post, index) => {

                            if(postList.length === index + 1){
                                return (
                                <div className="item" ref={lastPostElementRef} key={post.id}>
                                    <div className="item-header">
                                        <p>{post.id}. {post.title}</p>
                                        </div>
                                    <hr />
                                    <div className="item-body">{post.body}</div>
                                </div>
                                )
                            }
                            else{
                                return (
                                <div className="item" key={post.id}>
                                    <div className="item-header">
                                        <p>{post.id}. {post.title}</p>
                                        </div>
                                    <hr />
                                    <div className="item-body">{post.body}</div>
                                </div>
                                )
                            }  
                    })
                }    
                </div>
        </div>
        <div className="footer">
            <div className="loading" > { (loading && !hasMore) && 'Loading...' } </div>
            <div className="error"> { error && 'Error...' } </div>
        </div>
    </>
    );
}