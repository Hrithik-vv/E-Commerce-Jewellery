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
