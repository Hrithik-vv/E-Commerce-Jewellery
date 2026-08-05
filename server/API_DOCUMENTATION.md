# E-Commerce Jewellery API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Routes

### 1. User Signup
Register a new user account.

**Endpoint:** `POST /auth/signup`
**Access:** Public

#### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | 3 to 50 characters. Letters and single spaces between words only. |
| `email` | String | Yes | Valid email format, maximum 100 characters. |
| `password` | String | Yes | 8 to 20 characters, no spaces. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. |
| `confirmPassword` | String | Yes | Must match `password`. |
| `consent` | Boolean | Yes | Must be `true` to accept Terms & Conditions and Privacy Policy. |

#### Responses
**Success (201 Created)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64d...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

**Error (400 Bad Request)**
- Validation errors (e.g., missing fields, invalid format, passwords not matching).

**Error (409 Conflict)**
- Email already registered.

---

### 2. User/Admin Signin
Authenticate a user or administrator and retrieve an access token.

**Endpoint:** `POST /auth/signin`
**Access:** Public

#### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | Yes | Valid email format. |
| `password` | String | Yes | 8 to 20 characters, no spaces. |

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "accessToken": "eyJhbG...",
  "user": {
    "id": "64d...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

**Error (400 Bad Request)**
- Validation errors (e.g., missing fields, invalid email format, invalid password format).

**Error (401 Unauthorized)**
- Invalid email or password.

---

## Product Routes

### 1. Add Product
Create a new product with an image.

**Endpoint:** `POST /products/addproduct`
**Content-Type:** `form-data`
**Access:** Public

#### Request Body (Form-Data)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `productName` | String | Yes | Name of the product. |
| `description` | String | Yes | Description of the product. |
| `category` | String | Yes | Must be one of: Rings, Necklaces, Bracelets, Earrings, Bangles, Jhumkas. |
| `price` | Number | Yes | Selling price of the product (positive number). |
| `compareAtPrice` | Number | No | Original price, must be greater than `price` if provided. |
| `stockQuantity` | Number | Yes | Available stock quantity. |
| `isBestSeller` | Boolean | No | Mark as best seller (`true` or `false`). |
| `productImage` | File | Yes | Image file (PNG, JPG, JPEG) up to 5MB. Uploaded to Cloudinary. |

#### Responses
**Success (201 Created)**
```json
{
  "success": true,
  "message": "Product added successfully.",
  "product": {
    "_id": "64e...",
    "productName": "Emerald Drop Earrings",
    "category": "Earrings",
    "price": 5000,
    "productImage": "https://res.cloudinary.com/.../image.png",
    "createdAt": "2026-08-04T12:00:00Z"
  }
}
```

**Error (400 Bad Request)**
- Validation errors (e.g., missing fields, compare-at price less than price).

---

### 2. Get All Products
Fetch a list of all products, sorted by newest first.

**Endpoint:** `GET /products/allproducts`
**Access:** Public

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "count": 1,
  "products": [
    {
      "_id": "64e...",
      "productName": "Emerald Drop Earrings",
      "price": 5000
    }
  ]
}
```

---

### 3. Edit Product
Update an existing product's details and optionally upload a new image.

**Endpoint:** `PUT /products/editproduct/:id`
**Content-Type:** `multipart/form-data`
**Access:** Public

#### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | The MongoDB ObjectId of the product to update. |

#### Request Body (Form-Data)
Provides the same fields as **Add Product**, but all fields are **optional**. 
- Providing a new `productImage` uploads it to Cloudinary and updates the record.
- Providing an empty string for `compareAtPrice` removes the compare-at price from the product.

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": { ...updated details... }
}
```

**Error (404 Not Found)**
- Product with the provided ID does not exist.

---

### 4. Get Single Product Details
Fetch the full details of a single product by its ID.

**Endpoint:** `GET /products/getsingleproductdetails/:id`
**Access:** Public

#### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | The MongoDB ObjectId of the product. |

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "product": {
    "_id": "64e...",
    "productName": "Emerald Drop Earrings",
    "price": 5000,
    "...": "..."
  }
}
```

**Error (404 Not Found)**
- Product not found.

---

### 5. Get Related Products
Fetch up to 4 related products based on the main product's category (excluding the main product).

**Endpoint:** `GET /products/getrelatedproducts/:id`
**Access:** Public

#### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | The MongoDB ObjectId of the main product. |

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "count": 4,
  "products": [
    {
      "_id": "64e...",
      "productName": "Matching Necklace",
      "price": 3000
    }
  ]
}
```

---

### 6. Get Best Sellers
Fetch best-selling products with pagination, sorting, and price filtering.

**Endpoint:** `GET /products/getbestsellers`
**Access:** Public

#### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page` | Number | No | Page number for pagination (default: 1). |
| `limit` | Number | No | Number of products per page (default: 24). |
| `sort` | String | No | Sort order. Options: `price-low-high`, `date-new-old`. |
| `minPrice` | Number | No | Minimum price filter. |
| `maxPrice` | Number | No | Maximum price filter. |

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "count": 24,
  "totalCount": 50,
  "highestPrice": 10000,
  "currentPage": 1,
  "totalPages": 3,
  "products": [
    { ... }
  ]
}
```

---

### 7. Get Products By Category
Fetch products for a specific category with pagination, sorting, and price filtering.

**Endpoint:** `GET /products/getproductsbycategory/:category`
**Access:** Public

#### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `category` | String | Yes | The category name (e.g., Rings, Necklaces). |

#### Query Parameters
Supports the exact same query parameters as the **Get Best Sellers** endpoint (`page`, `limit`, `sort`, `minPrice`, `maxPrice`).

#### Responses
**Success (200 OK)**
Same response structure as **Get Best Sellers**.

---

### 8. Delete Product
Delete an existing product by its ID.

**Endpoint:** `DELETE /products/deleteproduct/:id`
**Access:** Public

#### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | The MongoDB ObjectId of the product to delete. |

#### Responses
**Success (200 OK)**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error (404 Not Found)**
- Product not found.
