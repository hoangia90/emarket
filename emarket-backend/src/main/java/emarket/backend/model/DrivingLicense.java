package emarket.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.annotation.JsonCreator;
//import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.validation.annotation.Validated;


@Entity
@Table(name = "driving_license")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2021-06-25T21:18:03.467Z")
public class DrivingLicense {
	
	@Id  
	@GeneratedValue(
		strategy = GenerationType.IDENTITY )
	@JsonProperty("drivingLicenseId")
	@Column(name = "driving_license_id")	
	  private Integer drivingLicenseId = null;
	
	  @JsonProperty("partnerId")
	  private String partnerId = null;
	  
	  @JsonProperty("contractId")
	  private String contractId = null;

	  @Column(columnDefinition="TEXT", name = "driving_license_no")
	  @JsonProperty("drivingLicenseNo")
	  private String drivingLicenseNo = null;

	  @JsonProperty("status")
	  private Integer status = null;

	  @JsonProperty("description")
	  private String description = null;

	  @JsonProperty("createdDate")
	  @Column(name = "created_date")
	  private String createdDate = null;

	  @JsonProperty("updatedDate")
	  @Column(name = "updated_date")
	  private String updatedDate = null;

	  public DrivingLicense drivingLicenseId(Integer drivingLicenseId) {
	    this.drivingLicenseId = drivingLicenseId;
	    return this;
	  }

	  /**
	   * Get drivingLicenseId
	   * @return drivingLicenseId
	  **/
	  @ApiModelProperty(value = "")


	  public Integer getDrivingLicenseId() {
	    return drivingLicenseId;
	  }

	  public void setDrivingLicenseId(Integer drivingLicenseId) {
	    this.drivingLicenseId = drivingLicenseId;
	  }

	  public DrivingLicense partnerId(String partnerId) {
	    this.partnerId = partnerId;
	    return this;
	  }

	  /**
	   * Get partnerId
	   * @return partnerId
	  **/
	  @ApiModelProperty(value = "")


	  public String getPartnerId() {
	    return partnerId;
	  }

	  public void setPartnerId(String partnerId) {
	    this.partnerId = partnerId;
	  }
	  
	  /**
	   * Get contractId
	   * @return contractId
	  **/
	  @ApiModelProperty(value = "")


	  public String getContractId() {
	    return contractId;
	  }

	  public void setContractId(String contractId) {
	    this.contractId = contractId;
	  }

	  public DrivingLicense drivingLicenseNo(String drivingLicenseNo) {
	    this.drivingLicenseNo = drivingLicenseNo;
	    return this;
	  }

	  /**
	   * Get drivingLicenseNo
	   * @return drivingLicenseNo
	  **/
	  @ApiModelProperty(value = "")


	  public String getDrivingLicenseNo() {
	    return drivingLicenseNo;
	  }

	  public void setDrivingLicenseNo(String drivingLicenseNo) {
	    this.drivingLicenseNo = drivingLicenseNo;
	  }

	  public DrivingLicense status(Integer status) {
	    this.status = status;
	    return this;
	  }

	  /**
	   * Get status
	   * @return status
	  **/
	  @ApiModelProperty(value = "")


	  public Integer getStatus() {
	    return status;
	  }

	  public void setStatus(Integer status) {
	    this.status = status;
	  }

	  public DrivingLicense description(String description) {
	    this.description = description;
	    return this;
	  }

	  /**
	   * Get description
	   * @return description
	  **/
	  @ApiModelProperty(value = "")


	  public String getDescription() {
	    return description;
	  }

	  public void setDescription(String description) {
	    this.description = description;
	  }

	  public DrivingLicense createdDate(String createdDate) {
	    this.createdDate = createdDate;
	    return this;
	  }

	  /**
	   * Get createdDate
	   * @return createdDate
	  **/
	  @ApiModelProperty(value = "")


	  public String getCreatedDate() {
	    return createdDate;
	  }

	  public void setCreatedDate(String createdDate) {
	    this.createdDate = createdDate;
	  }

	  public DrivingLicense updatedDate(String updatedDate) {
	    this.updatedDate = updatedDate;
	    return this;
	  }

	  /**
	   * Get updatedDate
	   * @return updatedDate
	  **/
	  @ApiModelProperty(value = "")


	  public String getUpdatedDate() {
	    return updatedDate;
	  }

	  public void setUpdatedDate(String updatedDate) {
	    this.updatedDate = updatedDate;
	  }


	  @Override
	  public boolean equals(java.lang.Object o) {
	    if (this == o) {
	      return true;
	    }
	    if (o == null || getClass() != o.getClass()) {
	      return false;
	    }
	    DrivingLicense drivingLicense = (DrivingLicense) o;
	    return Objects.equals(this.drivingLicenseId, drivingLicense.drivingLicenseId) &&
	        Objects.equals(this.partnerId, drivingLicense.partnerId) &&
	        Objects.equals(this.contractId, drivingLicense.contractId) &&
	        Objects.equals(this.drivingLicenseNo, drivingLicense.drivingLicenseNo) &&
	        Objects.equals(this.status, drivingLicense.status) &&
	        Objects.equals(this.description, drivingLicense.description) &&
	        Objects.equals(this.createdDate, drivingLicense.createdDate) &&
	        Objects.equals(this.updatedDate, drivingLicense.updatedDate);
	  }

	  @Override
	  public int hashCode() {
	    return Objects.hash(drivingLicenseId, partnerId, drivingLicenseNo, status, description, createdDate, updatedDate);
	  }

	  @Override
	  public String toString() {
	    StringBuilder sb = new StringBuilder();
	    sb.append("class DrivingLicense {\n");
	    
	    sb.append("    drivingLicenseId: ").append(toIndentedString(drivingLicenseId)).append("\n");
	    sb.append("    partnerId: ").append(toIndentedString(partnerId)).append("\n");
	    sb.append("    contractId: ").append(toIndentedString(contractId)).append("\n");
	    sb.append("    drivingLicenseNo: ").append(toIndentedString(drivingLicenseNo)).append("\n");
	    sb.append("    status: ").append(toIndentedString(status)).append("\n");
	    sb.append("    description: ").append(toIndentedString(description)).append("\n");
	    sb.append("    createdDate: ").append(toIndentedString(createdDate)).append("\n");
	    sb.append("    updatedDate: ").append(toIndentedString(updatedDate)).append("\n");
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
