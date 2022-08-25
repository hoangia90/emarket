package emarket.backend.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.annotation.JsonCreator;
//import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;
//import javax.validation.Valid;
//import javax.validation.constraints.*;

/**
 * ObjectValue
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2021-12-02T00:31:44.755Z")


public class ObjectValue   {
//  @JsonProperty("id")
//  private Long id = null;

  @JsonProperty("coefficient")
  private Integer coefficient = null;

  @JsonProperty("customerAssemblyDeviceID")
  private String customerAssemblyDeviceID = null;

  @JsonProperty("dateTime")
  private String dateTime = null;

  @JsonProperty("value")
  private String value = null;

//  public ObjectValue id(Long id) {
//    this.id = id;
//    return this;
//  }

  /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(value = "")


//  public Long getId() {
//    return id;
//  }

//  public void setId(Long id) {
//    this.id = id;
//  }

  public ObjectValue coefficient(Integer coefficient) {
    this.coefficient = coefficient;
    return this;
  }

  /**
   * Get coefficient
   * @return coefficient
  **/
  @ApiModelProperty(value = "")


  public Integer getCoefficient() {
    return coefficient;
  }

  public void setCoefficient(Integer coefficient) {
    this.coefficient = coefficient;
  }

  public ObjectValue customerAssemblyDeviceID(String customerAssemblyDeviceID) {
    this.customerAssemblyDeviceID = customerAssemblyDeviceID;
    return this;
  }

  /**
   * Get customerAssemblyDeviceID
   * @return customerAssemblyDeviceID
  **/
  @ApiModelProperty(value = "")


  public String getCustomerAssemblyDeviceID() {
    return customerAssemblyDeviceID;
  }

  public void setCustomerAssemblyDeviceID(String customerAssemblyDeviceID) {
    this.customerAssemblyDeviceID = customerAssemblyDeviceID;
  }

  public ObjectValue dateTime(String dateTime) {
    this.dateTime = dateTime;
    return this;
  }

  /**
   * Get dateTime
   * @return dateTime
  **/
  @ApiModelProperty(value = "")


  public String getDateTime() {
    return dateTime;
  }

  public void setDateTime(String dateTime) {
    this.dateTime = dateTime;
  }

  public ObjectValue value(String value) {
    this.value = value;
    return this;
  }

  /**
   * Get value
   * @return value
  **/
  @ApiModelProperty(value = "")


  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ObjectValue objectValue = (ObjectValue) o;
    return 
//    		Objects.equals(this.id, objectValue.id) &&
        Objects.equals(this.coefficient, objectValue.coefficient) &&
        Objects.equals(this.customerAssemblyDeviceID, objectValue.customerAssemblyDeviceID) &&
        Objects.equals(this.dateTime, objectValue.dateTime) &&
        Objects.equals(this.value, objectValue.value);
  }

//  @Override
//  public int hashCode() {
//    return Objects.hash(id, coefficient, customerAssemblyDeviceID, dateTime, value);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ObjectValue {\n");
    
//    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    coefficient: ").append(toIndentedString(coefficient)).append("\n");
    sb.append("    customerAssemblyDeviceID: ").append(toIndentedString(customerAssemblyDeviceID)).append("\n");
    sb.append("    dateTime: ").append(toIndentedString(dateTime)).append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
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

