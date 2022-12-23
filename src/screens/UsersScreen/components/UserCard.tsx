import { Card } from 'antd';
import { MailOutlined, PhoneOutlined, GlobalOutlined, HeartOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";
import "./index.css";

type UserCardProps = {
  name: string
  email: string
  phone?: string
  website?: string
  username: string
  title: string
}

export const UserCard = ({ name, email, phone, website, username }:UserCardProps ) => {
  return (
    <Card 
      hoverable
      className="user-card"
      cover={
        <img
          alt={username} className="avatar"
          src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
        />
      }
      actions={[
        <HeartOutlined className="heart" title="heart"/>,
        <EditOutlined title="edit"/>,
        <DeleteFilled title='delete'/>,
      ]}
    >
      <p className="name">
        {name}
      </p>
      <p>
        <MailOutlined /> {email}
      </p>
      <p>
        <PhoneOutlined /> {phone}
      </p>
      <p>
        <GlobalOutlined /> {website}
      </p>
    </Card>
  );
};
