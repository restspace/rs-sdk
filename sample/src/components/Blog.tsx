import React from "react";
import { Link } from "react-router-dom";
import { useDataServiceList } from "@restspace/react-url-data";
import { Post } from "./EditBlog";

export const Blog = () => {
	const { isLoading, isError, data, error } = useDataServiceList('/posts', "items");
	return (
		<>
		<div>Blog</div>
		<ul>
			{Object.values(data as Record<string, Post> || {}).map(post => (
				<>
				<div>
					<Link to={`/view/${post.date}`}>
						<span>{post.date}</span> <span>{post.title}</span>
					</Link>
				</div>
				</>
			))}
		</ul>
		</>
	);
};