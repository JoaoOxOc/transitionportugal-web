import React from "react";
// import { storiesOf, addDecorator } from '@storybook/react';
// import {muiTheme} from 'storybook-addon-material-ui';

import ProfileCover from "../components/Profiles/CompanyProfileCover";

export default {
  title: "Example/ProfileCover",
  component: ProfileCover,
};

const Template = (args) => <ProfileCover {...args} />;
export const ProfileCoverComponent = Template.bind({});
ProfileCoverComponent.args = {
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies, tortor quis rhoncus mattis, nisi enim placerat leo, nec porta lectus nibh in erat. Sed mauris ipsum",
  thumbnail:
    "<PATH to Your IMAGE>",
  tag: "nature",
  targetlabel: "Learn More",
  altText: "Nature",
  association: {}
};