import { Col, Row } from "antd";
import { useOnceMountEffect } from "../../helper/UseOnceMountEffect";
import { useState } from "react";
import { getUsers } from "./api/get";
import { UserCard } from "./components/UserCard";
import { UserType } from "./types";
import { Spinner } from "../../components/Spinner";
import { Typography } from "antd";
const { Text } = Typography;

export const UsersScreen = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  useOnceMountEffect(() => { //useEffect is called 2x on page load
    console.log("++++ useOnceMountEffect +++++")
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        setHasErrors(true);
        setIsLoading(false);
      }
    };

    fetchUsers();
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {hasErrors ? (
            <Text type="danger">
              Oooops! Something went wrong. Please try again later.
            </Text>
          ) : (
            <div>
              <h1>Users</h1>
              <Row gutter={[12, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                {users.map(({ id, name, username, email, phone, website }) => (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    key={id}
                    aria-label="user-card"
                  >
                    <UserCard
                      title="user-card"
                      username={username}
                      name={name}
                      email={email}
                      phone={phone}
                      website={website}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}
    </>
  );
};
