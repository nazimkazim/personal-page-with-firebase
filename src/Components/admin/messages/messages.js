import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { firebasePromotions } from "../../../firebase";
import { firebaseLooper } from "../../ui/misc";
import { css } from "react-emotion";
import { BarLoader } from "react-spinners";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class DisplayMessages extends Component {
  state = {
    isLoading: true,
    promotions: [],
    marginTop: "40px",
    successForm: ""
  };

  componentDidMount() {
    firebasePromotions.once("value").then(snapshot => {
      const promotions = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        marginTop: "0px",
        promotions: promotions
      });
    });
  }

  successForm(message) {
    this.setState({
      successForm: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }

  deleteItem(event, promotion) {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            firebasePromotions
              .child(promotion.id)
              .remove()
              .then(() => {
                this.successForm("Removed successfully");
                this.props.history.push("/admin_messages");
              });
          }
        },
        {
          label: "No",
          onClick: () => {
            return false;
          }
        }
      ]
    });
  }

  render() {
    //console.log(this.state.photosMain);
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <AdminLayout>
        <React.Fragment>
          <div className="container is-fluid">
            <div
              className="has-text-centered"
              style={{ marginTop: this.state.marginTop }}
            >
              {this.state.isLoading ? (
                <BarLoader
                  className={override}
                  sizeUnit={"px"}
                  size={50}
                  width={100}
                  height={4}
                  color={"#2D7969"}
                  loading={this.state.loading}
                />
              ) : (
                ""
              )}
            </div>
            <div className="columns" style={{ marginTop: "30px" }}>
              <div className="column">
                <table className="table">
                  <thead>
                    <tr>
                      <th title="Name">Name</th>
                      <th title="Email">email</th>
                      <th title="Country">country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.promotions
                      ? this.state.promotions.map((promotion, i) => (
                          <tr>
                            <td>{promotion.name}</td>
                            <td>{promotion.email}</td>
                            <td>
                              {promotion.country}
                              <span
                                onClick={event => {
                                  this.deleteItem(event, promotion);
                                }}
                              >
                                <i class="fa fa-trash" aria-hidden="true" />
                              </span>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      </AdminLayout>
    );
  }
}

export default DisplayMessages;
