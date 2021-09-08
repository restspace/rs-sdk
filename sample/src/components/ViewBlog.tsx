import { useDataServiceMutation, useDataServiceQuery } from "@restspace/react-url-data";
import { SchemaSubmitForm } from "@restspace/schema-form";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Comment, Post } from "./EditBlog";

export interface ViewBlogProps {
	postDate: string;
}

const commentSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		comment: { type: "string", editor: "textarea" }
	}
}

export const ViewBlog = () => {
	let { postDate } = useParams<ViewBlogProps>();
	const { isLoading, isError, data, error } = useDataServiceQuery<Post>('/posts', postDate);
	const mutPost = useDataServiceMutation('/posts', postDate);

	const onSubmit = async (submitted: object) => {
		if (data) {
			const comment = submitted as Comment;
			const dt = new Date();
			comment.date = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
			data.comments = [ ...(data.comments || []), comment ];
			mutPost.mutate(data);
		}
		return true;
	};

	return (
		<>
		<div>Blog</div>
		<h1>{ data?.title }</h1>
		<h2>{ data?.date }</h2>
		<div>{ data?.body }</div>
		{data?.comments?.length && <h2>Comments</h2>}
		{data?.comments?.map(comment =>
			<div>{comment.comment}</div>
		)}
		<h3>Add a comment</h3>
		<SchemaSubmitForm
			schema={commentSchema}
			makeSubmitLink={(onclick) => <button type="button" onClick={onclick}>SUBMIT</button>}
			value={{}}
			onSubmit={onSubmit}
			/>
		</>
	);
};