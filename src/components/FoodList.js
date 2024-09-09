import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart"/*Tooltip 鼠标放上去会显示小弹窗 */>
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const FoodList = () => {                                    
  const [foodData, setFoodData] = useState([]);                 // 用到谁加谁，state名字可以自己改
  const [curRest, setCurRest] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()                                            // API放在useEffect，返回放在state里
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []);

  useEffect(() => {
    if (curRest) {                                      // 当选择curRest再执行操作
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);                                        // 此为dependency array, 每次curRest改变，自动加载(调用)

  return (
    <>
      <Select                                           // 一个下滑栏
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}                           // 自带状态栏，动画
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {                    // map（）将左侧array里的每一个元素执行右侧操作
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {curRest && (                                     // 短路，当curRest存在才执行右侧
        <List                                           // List显示餐馆具体信息
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.image_url}
                  alt={item.name}                               // 如果没有图片，给个名字
                  style={{ width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;