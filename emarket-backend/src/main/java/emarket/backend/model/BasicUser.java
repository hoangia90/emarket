package emarket.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;

/**
 * BasicUser
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-02-05T03:04:22.903Z[GMT]")


public class BasicUser   {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("username")
  private String username = null;

  @JsonProperty("firstName")
  private String firstName = null;

  @JsonProperty("lastName")
  private String lastName = null;
  
 

  public BasicUser(Integer id, String username, String firstName, String lastName) {
	super();
	this.id = id;
	this.username = username;
	this.firstName = firstName;
	this.lastName = lastName;
}

public BasicUser id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   **/
//  @Schema(description = "")
  
    public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public BasicUser username(String username) {
    this.username = username;
    return this;
  }

  /**
   * Get username
   * @return username
   **/
//  @Schema(description = "")
  
    public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public BasicUser firstName(String firstName) {
    this.firstName = firstName;
    return this;
  }

  /**
   * Get firstName
   * @return firstName
   **/
//  @Schema(description = "")
  
    public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public BasicUser lastName(String lastName) {
    this.lastName = lastName;
    return this;
  }

  /**
   * Get lastName
   * @return lastName
   **/
//  @Schema(description = "")
  
    public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BasicUser basicUser = (BasicUser) o;
    return Objects.equals(this.id, basicUser.id) &&
        Objects.equals(this.username, basicUser.username) &&
        Objects.equals(this.firstName, basicUser.firstName) &&
        Objects.equals(this.lastName, basicUser.lastName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, firstName, lastName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BasicUser {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    username: ").append(toIndentedString(username)).append("\n");
    sb.append("    firstName: ").append(toIndentedString(firstName)).append("\n");
    sb.append("    lastName: ").append(toIndentedString(lastName)).append("\n");
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
