import React, { useEffect, useState } from "react";
import { useDataServiceMutation, useDataServiceQuery } from "@restspace/react-url-data";
import { SchemaSubmitForm } from "@restspace/schema-form";
import { Post } from "../../serviceFiles/url-data-types/Post";

export interface EditBlogProps {
	editPostDate?: string;
}

export const EditBlog = ({ editPostDate }: EditBlogProps) => {
	const [ post, setPost ] = useState<Post>({ date: '', title: '', body: '', comments: [] });
	const schemaQuery = useDataServiceQuery<any>('/post', '.schema.json');
	const mutPost = useDataServiceMutation('/post/', post.date);

	useEffect(() => {
		if (post && post.date) mutPost.mutate(post);
	}, [ post ]);
	
	return (
		<section>
			<div>Create Blog</div>
			<div></div>
			{schemaQuery.isSuccess && <SchemaSubmitForm
				schema={schemaQuery.data}
				value={post}
				makeSubmitLink={(onclick) => <button type="button" onClick={onclick}>SUBMIT</button>}
				onSubmit={async (post: Post) => { setPost(post); return true; }}
			/>}
		</section>
	);
};