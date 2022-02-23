import React from "react";
import { View, Text, Switch, TouchableOpacity, Button, Alert } from "react-native";
import { Icon } from "react-native-elements";
import JoinCalendar from "./JoinCalendar";
import { updatePrivacy } from "../../api/calendar";
/*

    Calendar Props: {
        route: {
            title,
            isPrivate,
            createrUID
        },
        user
    }

    Calendar: {
        id: string
        title: String,
        deadlines: Deadline [],
        isPrivate: boolean,
        createrUID: string,
        members
    }
*/

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      privateCalendar: this.props.route.params.isPrivate,
      isMember: this.props.route.params.members.includes(this.props.user.uid),
      loading: false,
    };
  }

  changePrivacy = () => {
    this.setState({
      loading: true
    })
    updatePrivacy(this.props.uid)
    .then(res => {
      this.setState({
        loading: false
      })
      if (res === 'success') {
        this.setState({
          privateCalendar: !this.state.privateCalendar
        })
      } else {
        return Alert.alert("An error occured. Please try later");
      }
    })
    .catch(err => {
      this.setState({
        loading: false
      });
      return Alert.alert("An error occured. Please try later");
    })
  }

  alterMemberStatus = () => {
    if (this.state.isMember === true) {
      // add API call to remove user from this calendar

      this.setState({
        isMember: false,
      });
    } else {
      // add API call to add user to this calendar

      this.setState({
        isMember: true,
      });
    }
  };

  render() {
    const { route, user, navigation } = this.props;
    const { title, isPrivate, createrUID } = route.params;

    return (
      <View
        style={{
          padding: "10%",
          paddingTop: "20%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: "5%",
            justifyContent: "flex-start",
            width: "100%",
            overflow: "visible",
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" type="font-awesome" color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: "30rem",
              fontWeight: "600",
              marginLeft: "10%",
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end'
          }}
            onPress={() => {
              this.alterMemberStatus();
            }}
          >
            <Text
              style={{
                color: this.state.isMember ? "red" : "green",
                fontSize: "20rem",
                fontWeight: "300",
                marginTop: "4%",
              }}
            >
              {this.state.isMember ? "Leave Calendar" : "Join Calendar"}
            </Text>
        </TouchableOpacity>
        <View
          style={{
            // flexDirection: 'row',
            marginTop: "10%",
          }}
        >
          <Text
            style={{
              fontSize: "20rem",
            }}
          >
            Private
          </Text>
          <Switch
            disabled={createrUID !== user.uid}
            style={{
              marginTop: "3%",
            }}
            value={this.state.privateCalendar}
            onValueChange={() => this.changePrivacy()}
            trackColor={{ false: "white", true: "#2776f5" }}
          />
        </View>
        <View>
          <JoinCalendar />
        </View>
      </View>
    );
  }
}
