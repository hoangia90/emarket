package emarket.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * User
 */
@Entity
@Table(name = "iuser")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2022-02-04T16:15:15.242Z")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
//	@Column(name = "id")
	private Integer id = null;

	@JsonProperty("username")
	private String username = null;

	@JsonProperty("password")
	private String password = null;

	@JsonProperty("firstName")
	private String firstName = null;

	@JsonProperty("lastName")
	private String lastName = null;

	@JsonProperty("email")
	private String email = null;

	@JsonProperty("phone")
	private String phone = null;

	@JsonProperty("avatarUrl")
	private String avatarUrl = null;

	@JsonProperty("token")
	private String token = null;

	@JsonProperty("created")
	private String created = null;

	@JsonProperty("modified")
	private String modified = null;

	@JsonProperty("status")
	private String status = null;

	public User id(Integer id) {
		this.id = id;
		return this;
	}

	/**
	 * Get id
	 * 
	 * @return id
	 **/
//	@Schema(description = "")

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User username(String username) {
		this.username = username;
		return this;
	}

	/**
	 * Get username
	 * 
	 * @return username
	 **/
//	@Schema(description = "")

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public User password(String password) {
		this.password = password;
		return this;
	}

	/**
	 * Get password
	 * 
	 * @return password
	 **/
//	@Schema(description = "")

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User firstName(String firstName) {
		this.firstName = firstName;
		return this;
	}

	/**
	 * Get firstName
	 * 
	 * @return firstName
	 **/
//	@Schema(description = "")

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public User lastName(String lastName) {
		this.lastName = lastName;
		return this;
	}

	/**
	 * Get lastName
	 * 
	 * @return lastName
	 **/
//	@Schema(description = "")

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public User email(String email) {
		this.email = email;
		return this;
	}

	/**
	 * Get email
	 * 
	 * @return email
	 **/
//	@Schema(description = "")

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User phone(String phone) {
		this.phone = phone;
		return this;
	}

	/**
	 * Get phone
	 * 
	 * @return phone
	 **/
//	@Schema(description = "")

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public User avatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
		return this;
	}

	/**
	 * Get avatarUrl
	 * 
	 * @return avatarUrl
	 **/
//	@Schema(description = "")

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public User token(String token) {
		this.token = token;
		return this;
	}

	/**
	 * Get token
	 * 
	 * @return token
	 **/
//	@Schema(description = "")

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public User created(String created) {
		this.created = created;
		return this;
	}

	/**
	 * Get created
	 * 
	 * @return created
	 **/
//	@Schema(description = "")

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public User modified(String modified) {
		this.modified = modified;
		return this;
	}

	/**
	 * Get modified
	 * 
	 * @return modified
	 **/
//	@Schema(description = "")

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public User status(String status) {
		this.status = status;
		return this;
	}

	/**
	 * Get status
	 * 
	 * @return status
	 **/
//	@Schema(description = "")

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public boolean equals(java.lang.Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		User user = (User) o;
		return Objects.equals(this.id, user.id) && Objects.equals(this.username, user.username)
				&& Objects.equals(this.password, user.password) && Objects.equals(this.firstName, user.firstName)
				&& Objects.equals(this.lastName, user.lastName) && Objects.equals(this.email, user.email)
				&& Objects.equals(this.phone, user.phone) && Objects.equals(this.avatarUrl, user.avatarUrl)
				&& Objects.equals(this.token, user.token) && Objects.equals(this.created, user.created)
				&& Objects.equals(this.modified, user.modified) && Objects.equals(this.status, user.status);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, username, password, firstName, lastName, email, phone, avatarUrl, token, created,
				modified, status);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("class User {\n");

		sb.append("    id: ").append(toIndentedString(id)).append("\n");
		sb.append("    username: ").append(toIndentedString(username)).append("\n");
		sb.append("    password: ").append(toIndentedString(password)).append("\n");
		sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
		sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
		sb.append("    email: ").append(toIndentedString(email)).append("\n");
		sb.append("    phone: ").append(toIndentedString(phone)).append("\n");
		sb.append("    avatarUrl: ").append(toIndentedString(avatarUrl)).append("\n");
		sb.append("    token: ").append(toIndentedString(token)).append("\n");
		sb.append("    created: ").append(toIndentedString(created)).append("\n");
		sb.append("    modified: ").append(toIndentedString(modified)).append("\n");
		sb.append("    status: ").append(toIndentedString(status)).append("\n");
		sb.append("}");
		return sb.toString();
	}

	/**
	 * Convert the given object to string with each line indented by 4 spaces
	 * (except the first line).
	 */
	private String toIndentedString(java.lang.Object o) {
		if (o == null) {
			return "null";
		}
		return o.toString().replace("\n", "\n    ");
	}
}