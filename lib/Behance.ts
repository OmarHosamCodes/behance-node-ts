/**
 Behance-node v1.0.0
 *
 * @link <a href='https://github.com/OmarHosamCodes/behance-node-ts'>GitHub repository</a>
 * @author <a href='https://github.com/ilies-t'>ilies t</a>
 * @licence Apache Licence 2.0
 */

// import main methods
import { MainMethods } from "./MainMethods";

/**
 * Main package class
 */
export class User {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	city: string;
	state: string;
	country: string;
	location: string;
	company: string;
	occupation: string;
	created_on: string;
	url: string;
	profile_picture: string;
	banner_image_url: string;
	followers: number;
	following: number;
	appreciations: number;
	views: number;
	comments: number;

	constructor() {
		this.id = "";
		this.first_name = "";
		this.last_name = "";
		this.username = "";
		this.city = "";
		this.state = "";
		this.country = "";
		this.location = "";
		this.company = "";
		this.occupation = "";
		this.created_on = "";
		this.url = "";
		this.profile_picture = "";
		this.banner_image_url = "";
		this.followers = 0;
		this.following = 0;
		this.appreciations = 0;
		this.views = 0;
		this.comments = 0;
	}

	fromJson(json: any) {
		this.id = json.profile.owner.id;
		this.first_name = json.profile.owner.first_name;
		this.last_name = json.profile.owner.last_name;
		this.username = json.profile.owner.username;
		this.city = json.profile.owner.city;
		this.state = json.profile.owner.state;
		this.country = json.profile.owner.country;
		this.location = json.profile.owner.location;
		this.company = json.profile.owner.company;
		this.occupation = json.profile.owner.occupation;
		this.created_on = json.profile.owner.created_on;
		this.url = json.profile.owner.url;
		this.profile_picture = json.profile.owner.images["276"];
		this.banner_image_url = json.profile.owner.banner_image_url;
		this.followers = json.profile.owner.stats.followers;
		this.following = json.profile.owner.stats.following;
		this.appreciations = json.profile.owner.stats.appreciations;
		this.views = json.profile.owner.stats.views;
		this.comments = json.profile.owner.stats.comments;
	}
}

export default class Behance {
	// methods

	/**
	 * Get user information by username.
	 *
	 * @param username Desired username.
	 * @param detailed Return more detail about user or not.
	 */
	public static async user(username: string, detailed?: boolean): Promise<any> {
		// get JSON data with jsonDOM()
		return MainMethods.getJSONFromUrl(
			`https://www.behance.net/${username}`,
		).then((jsonResponse: any) => {
			// then return more data
			if (detailed) {
				return MainMethods.deleteInsignificantUserData(jsonResponse).then(
					() => {
						return jsonResponse;
					},
				);

				// then return basic data
			}
			// make the response
			const user = new User();
			user.fromJson(jsonResponse);
			return user;
		});
	}

	/**
	 * Get project data by project path.
	 *
	 * @param path Desired project path, must contain project id and name.
	 */
	public static async project(path: string): Promise<any> {
		// get JSON data with jsonDOM()
		return MainMethods.getJSONFromUrl(
			`https://www.behance.net/gallery/${path}`,
		).then((jsonResponse: any) => {
			return MainMethods.deleteInsignificantProjectData(jsonResponse).then(
				() => {
					return jsonResponse;
				},
			);
		});
	}

	/**
	 * Get a random project data using sort.
	 *
	 * @param sort Type of sort.
	 * @param time Date parameter for sort.
	 */
	public static async randomProject(
		sort?:
			| "recommended"
			| "curated"
			| "most_appreciated"
			| "most_viewed"
			| "most_commented"
			| "most_recent",
		time?: "today" | "this_week" | "this_month" | "all_time",
	): Promise<any> {
		// unknown parameters
		if (
			![
				undefined,
				null,
				"recommended",
				"curated",
				"most_appreciated",
				"most_viewed",
				"most_commented",
				"most_recent",
			].includes(sort) &&
			![
				undefined,
				null,
				"today",
				"this_week",
				"this_month",
				"all_time",
			].includes(time)
		) {
			throw new Error(`'${sort}' is not a valid sort parameter`);
		}

		// create url
		let URL = "https://www.behance.net/search";
		let sortURL = "";
		let timeURL = "";
		let isTimeSortAllowed: boolean;

		// these cannot be sorted by date
		if (
			sort === "recommended" ||
			sort === "curated" ||
			sort === "most_recent"
		) {
			switch (sort) {
				case "curated":
					sortURL = "featured_date";
					break;

				case "most_recent":
					sortURL = "published_date";
					break;

				default:
					sortURL = "recommended";
					break;
			}

			isTimeSortAllowed = false;
			URL += `?sort=${sortURL}`;
		}

		// these can be sorted by date
		else if (
			sort === "most_appreciated" ||
			sort === "most_viewed" ||
			sort === "most_commented"
		) {
			switch (sort) {
				case "most_appreciated":
					timeURL = "appreciations";
					break;

				case "most_viewed":
					timeURL = "views";
					break;

				case "most_commented":
					timeURL = "comments";
					break;
			}

			isTimeSortAllowed = true;
			URL += `?sort=${timeURL}`;
		}

		// append time
		if (isTimeSortAllowed) {
			switch (time) {
				case "today":
					timeURL = "today";
					break;

				case "this_week":
					timeURL = "week";
					break;

				case "this_month":
					timeURL = "month";
					break;

				case "all_time":
					timeURL = "all";
					break;

				default:
					timeURL = "week";
					break;
			}

			URL += `&time=${timeURL}`;
		}

		// get JSON data with jsonDOM()
		return MainMethods.getJSONFromUrl(URL).then((jsonResponse: any) => {
			// get length of all projects
			const count: number = Object.keys(
				jsonResponse.search.content.projects,
			).length;

			// random chose between all projects
			const theChosenOne = Math.floor(Math.random() * count);

			return jsonResponse.search.content.projects[theChosenOne];
		});
	}
}
