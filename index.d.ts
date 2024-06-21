// index.d.ts

/**
 * Behance-node v1.0.0
 *
 * @link <a href='https://github.com/ilies-t/behance-node'>GitHub repository</a>
 * @author <a href='https://github.com/ilies-t'>ilies t</a>
 * @licence Apache Licence 2.0
 */

declare module "behance-node" {
	export class MainMethods {
		/**
		 * Get JSON object from DOM.
		 *
		 * @param url URL to scrape.
		 */
		public static getJSONFromUrl(url: string): Promise<any>;

		/**
		 * Delete insignificant data about user.
		 *
		 * @param user User containing data to delete.
		 */
		public static deleteInsignificantUserData(user: any): Promise<void>;

		/**
		 * Delete insignificant data about project.
		 *
		 * @param project Project containing data to delete.
		 */
		public static deleteInsignificantProjectData(project: any): Promise<void>;
	}

	export default class Behance {
		/**
		 * Get user information by username.
		 *
		 * @param username Desired username.
		 * @param detailed Return more detail about user or not.
		 */
		public static user(username: string, detailed?: boolean): Promise<any>;

		/**
		 * Get project data by project path.
		 *
		 * @param path Desired project path, must contain project id and name.
		 */
		public static project(path: string): Promise<any>;

		/**
		 * Get a random project data using sort.
		 *
		 * @param sort Type of sort.
		 * @param time Date parameter for sort.
		 */
		public static randomProject(
			sort?:
				| "recommended"
				| "curated"
				| "most_appreciated"
				| "most_viewed"
				| "most_commented"
				| "most_recent",
			time?: "today" | "this_week" | "this_month" | "all_time",
		): Promise<any>;
	}
}
