// index.d.ts

/**
 * Behance-node v1.0.0
 *
 * @link <a href="https://github.com/OmarHosamCodes/behance-node-ts">GitHub repository</a>
 * @author <a href="https://github.com/OmarHosamCodes/">ilies t</a>
 * @licence Apache Licence 2.0
 */

declare module "behance-node" {
	/**
	 * Main methods.
	 */

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
}
