from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    stock: int


class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: str


class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int