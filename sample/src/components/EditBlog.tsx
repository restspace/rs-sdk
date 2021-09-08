import React, { useEffect, useState } from "react";
import { useDataServiceMutation } from "@restspace/react-url-data";
import { SchemaSubmitForm } from "@restspace/schema-form";

export interface Comment {
	date: string;
	name: string;
	comment: string;
}

export interface Post {
	date: string;
	title: string;
	author?: string;
	body: string;
	comments: Comment[];
}

export interface EditBlogProps {
	editPostDate?: string;
}

export const EditBlog = ({ editPostDate }: EditBlogProps) => {
	const [ post, setPost ] = useState<Post>({ date: '', title: '', body: '', comments: [] });
	const mutPost = useDataServiceMutation('/posts/', post.date);

	useEffect(() => {
		mutPost.mutate(post);
	}, [ post ]);

	const blogSchema = {
		type: "object",
		properties: {
			date: { type: "string", format: "date" },
			title: { type: "string" },
			author: { type: "string" },
			body: { type: "string", editor: "textarea" }
		}
	}
	return (
		<section>
			<div>Create Blog</div>
			<SchemaSubmitForm
				schema={blogSchema}
				value={post}
				makeSubmitLink={(onclick) => <button type="button" onClick={onclick}>SUBMIT</button>}
				onSubmit={async (post: Post) => { setPost(post); return true; }}
			/>
		</section>
	);
};