/**
 * @pathPattern ${date}
 */
export interface Post {
	/**
	 * @format date
	 */
	date: string;
	title: string;
	author?: string;
	/**
	 * @editor textarea
	 */
	body: string;
	comments: Comment[];
}

export interface Comment {
	/**
	 * @format date
	 */
	date: string;
	name: string;
	/**
	 * @editor textarea
	 */
	comment: string;
}