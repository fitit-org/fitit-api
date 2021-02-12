---
title: FitIT API v1.0.0
language_tabs:
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="fitit-api">FitIT API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="https://api.fitit.tk/api/v1">https://api.fitit.tk/api/v1</a>

License: <a href="https://opensource.org/licenses/MIT">MIT</a>

# Authentication

- HTTP Authentication, scheme: bearer 

* API Key (tokenInQuery)
    - Parameter Name: **token**, in: query. 

* API Key (tokenInCookie)
    - Parameter Name: **token**, in: cookie. 

<h1 id="fitit-api-auth">auth</h1>

Login or register

## post__auth_login

`POST /auth/login`

*Authorize and get a token*

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "description": "User's email",
      "example": "email@example.com"
    },
    "password": {
      "type": "string",
      "description": "User's password",
      "example": "qwerty2137"
    }
  },
  "required": [
    "email",
    "password"
  ]
}
```

<h3 id="post__auth_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginData](#schemalogindata)|true|User's email and password|
|» email|body|string|true|User's email|
|» password|body|string|true|User's password|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "user": {
      "allOf": [
        {
          "allOf": [
            {
              "type": "object",
              "properties": {
                "class_ids": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "IDs of classes the user belongs to",
                    "example": "601bd55f22c26a2ef9298df3"
                  }
                },
                "_id": {
                  "type": "string",
                  "description": "User's ID",
                  "example": "601be28e50364b654dec42cf"
                },
                "isActive": {
                  "type": "boolean",
                  "description": "Was the user's account active",
                  "example": true
                },
                "isTeacher": {
                  "type": "boolean",
                  "description": "Is the user a teacher",
                  "example": false
                },
                "name": {
                  "type": "string",
                  "description": "User's name",
                  "example": "James"
                },
                "surname": {
                  "type": "string",
                  "description": "User's surname",
                  "example": "Smith"
                }
              },
              "required": [
                "class_ids",
                "_id",
                "isActive",
                "isTeacher",
                "name",
                "surname"
              ]
            },
            {
              "type": "object",
              "properties": {
                "activityLog_ids": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "IDs of activities the user performed",
                    "example": "601bef6a25c8480b19dd54cd"
                  }
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address",
              "example": "email@example.com"
            },
            "birthDate": {
              "type": "string",
              "description": "User's date of birth",
              "example": "2001-01-04T23:00:00.000Z"
            },
            "dateCreated": {
              "type": "string",
              "description": "The date of account's creation",
              "example": "2021-02-04T12:03:26.000Z"
            },
            "height": {
              "type": "number",
              "description": "User's height",
              "example": 182
            },
            "weight": {
              "type": "number",
              "description": "User's weight",
              "example": 60
            }
          },
          "required": [
            "email",
            "dateCreated"
          ]
        }
      ]
    },
    "token": {
      "type": "string",
      "description": "Authorization JWT token",
      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFiZTI4ZTUwMzY0YjY1NGRlYzQyY2YiLCJpYXQiOjE2MTMxMjQyMTksImV4cCI6MTYxMzcyOTAxOX0.FC_DqIJewnn01qL3LdYumNaiLY8W5yEmAhQ7ahkbGqw"
    }
  },
  "required": [
    "user",
    "token"
  ]
}
```

<h3 id="post__auth_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Login successfull|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Validation error|[HttpException](#schemahttpexception)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Wrong credentials provided|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="post__auth_login-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» user|any|true|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|any|false|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[BasicUserInfo](#schemabasicuserinfo)|false|none|none|
|»»»» class_ids|[string]|true|none|none|
|»»»» _id|string|true|none|User's ID|
|»»»» isActive|boolean|true|none|Was the user's account active|
|»»»» isTeacher|boolean|true|none|Is the user a teacher|
|»»»» name|string|true|none|User's name|
|»»»» surname|string|true|none|User's surname|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» activityLog_ids|[string]|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|object|false|none|none|
|»»» email|string|true|none|User's email address|
|»»» birthDate|string|false|none|User's date of birth|
|»»» dateCreated|string|true|none|The date of account's creation|
|»»» height|number|false|none|User's height|
|»»» weight|number|false|none|User's weight|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» token|[TokenObject](#schematokenobject)|true|none|Authorization JWT token|

<aside class="success">
This operation does not require authentication
</aside>

## post__auth_register

`POST /auth/register`

*Register a user*

> Body parameter

```json
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email",
          "example": "email@example.com"
        },
        "password": {
          "type": "string",
          "description": "User's password",
          "example": "qwerty2137"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "User's name",
          "example": "James"
        },
        "surname": {
          "type": "string",
          "description": "User's surname",
          "example": "Smith"
        },
        "classId": {
          "type": "string",
          "description": "Unique human-readable identifier of a class",
          "example": "dzikie-węże"
        },
        "birthDate": {
          "type": "string",
          "description": "User's birth date",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 180
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        },
        "isTeacher": {
          "type": "boolean",
          "description": "Is user a teacher",
          "example": false
        }
      },
      "required": [
        "name",
        "surname",
        "classId"
      ]
    }
  ]
}
```

<h3 id="post__auth_register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegistrationData](#schemaregistrationdata)|true|User's data|

> Example responses

> 200 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "class_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of classes the user belongs to",
                "example": "601bd55f22c26a2ef9298df3"
              }
            },
            "_id": {
              "type": "string",
              "description": "User's ID",
              "example": "601be28e50364b654dec42cf"
            },
            "isActive": {
              "type": "boolean",
              "description": "Was the user's account active",
              "example": true
            },
            "isTeacher": {
              "type": "boolean",
              "description": "Is the user a teacher",
              "example": false
            },
            "name": {
              "type": "string",
              "description": "User's name",
              "example": "James"
            },
            "surname": {
              "type": "string",
              "description": "User's surname",
              "example": "Smith"
            }
          },
          "required": [
            "class_ids",
            "_id",
            "isActive",
            "isTeacher",
            "name",
            "surname"
          ]
        },
        {
          "type": "object",
          "properties": {
            "activityLog_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of activities the user performed",
                "example": "601bef6a25c8480b19dd54cd"
              }
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email address",
          "example": "email@example.com"
        },
        "birthDate": {
          "type": "string",
          "description": "User's date of birth",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "dateCreated": {
          "type": "string",
          "description": "The date of account's creation",
          "example": "2021-02-04T12:03:26.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 182
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        }
      },
      "required": [
        "email",
        "dateCreated"
      ]
    }
  ]
}
```

<h3 id="post__auth_register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Registration successfull|[PrivateUserInfo](#schemaprivateuserinfo)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Data couldn't be validated, a user with an email already exists or the provided classId is invalid|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="post__auth_register-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="fitit-api-user">user</h1>

Access to user information

## get__user

`GET /user`

*Get current user's information*

> Example responses

> 200 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "class_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of classes the user belongs to",
                "example": "601bd55f22c26a2ef9298df3"
              }
            },
            "_id": {
              "type": "string",
              "description": "User's ID",
              "example": "601be28e50364b654dec42cf"
            },
            "isActive": {
              "type": "boolean",
              "description": "Was the user's account active",
              "example": true
            },
            "isTeacher": {
              "type": "boolean",
              "description": "Is the user a teacher",
              "example": false
            },
            "name": {
              "type": "string",
              "description": "User's name",
              "example": "James"
            },
            "surname": {
              "type": "string",
              "description": "User's surname",
              "example": "Smith"
            }
          },
          "required": [
            "class_ids",
            "_id",
            "isActive",
            "isTeacher",
            "name",
            "surname"
          ]
        },
        {
          "type": "object",
          "properties": {
            "activityLog_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of activities the user performed",
                "example": "601bef6a25c8480b19dd54cd"
              }
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email address",
          "example": "email@example.com"
        },
        "birthDate": {
          "type": "string",
          "description": "User's date of birth",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "dateCreated": {
          "type": "string",
          "description": "The date of account's creation",
          "example": "2021-02-04T12:03:26.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 182
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        }
      },
      "required": [
        "email",
        "dateCreated"
      ]
    }
  ]
}
```

<h3 id="get__user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Current user's data|[PrivateUserInfo](#schemaprivateuserinfo)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__user-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## patch__user

`PATCH /user`

*Update user's current information*

> Body parameter

```json
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email",
          "example": "email@example.com"
        },
        "password": {
          "type": "string",
          "description": "User's password",
          "example": "qwerty2137"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "User's name",
          "example": "James"
        },
        "surname": {
          "type": "string",
          "description": "User's surname",
          "example": "Smith"
        },
        "classId": {
          "type": "string",
          "description": "Unique human-readable identifier of a class",
          "example": "dzikie-węże"
        },
        "birthDate": {
          "type": "string",
          "description": "User's birth date",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 180
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        },
        "isTeacher": {
          "type": "boolean",
          "description": "Is user a teacher",
          "example": false
        }
      },
      "required": [
        "name",
        "surname",
        "classId"
      ]
    }
  ]
}
```

<h3 id="patch__user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegistrationData](#schemaregistrationdata)|false|Partial user's data|

> Example responses

> 200 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "class_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of classes the user belongs to",
                "example": "601bd55f22c26a2ef9298df3"
              }
            },
            "_id": {
              "type": "string",
              "description": "User's ID",
              "example": "601be28e50364b654dec42cf"
            },
            "isActive": {
              "type": "boolean",
              "description": "Was the user's account active",
              "example": true
            },
            "isTeacher": {
              "type": "boolean",
              "description": "Is the user a teacher",
              "example": false
            },
            "name": {
              "type": "string",
              "description": "User's name",
              "example": "James"
            },
            "surname": {
              "type": "string",
              "description": "User's surname",
              "example": "Smith"
            }
          },
          "required": [
            "class_ids",
            "_id",
            "isActive",
            "isTeacher",
            "name",
            "surname"
          ]
        },
        {
          "type": "object",
          "properties": {
            "activityLog_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of activities the user performed",
                "example": "601bef6a25c8480b19dd54cd"
              }
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email address",
          "example": "email@example.com"
        },
        "birthDate": {
          "type": "string",
          "description": "User's date of birth",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "dateCreated": {
          "type": "string",
          "description": "The date of account's creation",
          "example": "2021-02-04T12:03:26.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 182
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        }
      },
      "required": [
        "email",
        "dateCreated"
      ]
    }
  ]
}
```

<h3 id="patch__user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's updated data|[PrivateUserInfo](#schemaprivateuserinfo)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Validation error|[HttpException](#schemahttpexception)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="patch__user-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## delete__user

`DELETE /user`

*Delete user's account*

> Example responses

> 401 Response

```json
{
  "oneOf": [
    {
      "description": "Wrong authentication token",
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "status": {
                "type": "number",
                "description": "HTTP status"
              },
              "message": {
                "type": "string",
                "description": "Exception message"
              }
            },
            "required": [
              "status",
              "message"
            ]
          }
        }
      }
    },
    {
      "description": "Authentication token missing",
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "status": {
                "type": "number",
                "description": "HTTP status"
              },
              "message": {
                "type": "string",
                "description": "Exception message"
              }
            },
            "required": [
              "status",
              "message"
            ]
          }
        }
      }
    }
  ]
}
```

<h3 id="delete__user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Account successfully removed|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="delete__user-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## get__user_{userId}

`GET /user/{userId}`

*Get a user by ID*

<h3 id="get__user_{userid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|User's unique ID|

> Example responses

> 200 Response

```json
{
  "oneOf": [
    {
      "allOf": [
        {
          "allOf": [
            {
              "type": "object",
              "properties": {
                "class_ids": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "IDs of classes the user belongs to",
                    "example": "601bd55f22c26a2ef9298df3"
                  }
                },
                "_id": {
                  "type": "string",
                  "description": "User's ID",
                  "example": "601be28e50364b654dec42cf"
                },
                "isActive": {
                  "type": "boolean",
                  "description": "Was the user's account active",
                  "example": true
                },
                "isTeacher": {
                  "type": "boolean",
                  "description": "Is the user a teacher",
                  "example": false
                },
                "name": {
                  "type": "string",
                  "description": "User's name",
                  "example": "James"
                },
                "surname": {
                  "type": "string",
                  "description": "User's surname",
                  "example": "Smith"
                }
              },
              "required": [
                "class_ids",
                "_id",
                "isActive",
                "isTeacher",
                "name",
                "surname"
              ]
            },
            {
              "type": "object",
              "properties": {
                "activityLog_ids": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "IDs of activities the user performed",
                    "example": "601bef6a25c8480b19dd54cd"
                  }
                }
              }
            }
          ]
        },
        {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User's email address",
              "example": "email@example.com"
            },
            "birthDate": {
              "type": "string",
              "description": "User's date of birth",
              "example": "2001-01-04T23:00:00.000Z"
            },
            "dateCreated": {
              "type": "string",
              "description": "The date of account's creation",
              "example": "2021-02-04T12:03:26.000Z"
            },
            "height": {
              "type": "number",
              "description": "User's height",
              "example": 182
            },
            "weight": {
              "type": "number",
              "description": "User's weight",
              "example": 60
            }
          },
          "required": [
            "email",
            "dateCreated"
          ]
        }
      ]
    },
    {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "class_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of classes the user belongs to",
                "example": "601bd55f22c26a2ef9298df3"
              }
            },
            "_id": {
              "type": "string",
              "description": "User's ID",
              "example": "601be28e50364b654dec42cf"
            },
            "isActive": {
              "type": "boolean",
              "description": "Was the user's account active",
              "example": true
            },
            "isTeacher": {
              "type": "boolean",
              "description": "Is the user a teacher",
              "example": false
            },
            "name": {
              "type": "string",
              "description": "User's name",
              "example": "James"
            },
            "surname": {
              "type": "string",
              "description": "User's surname",
              "example": "Smith"
            }
          },
          "required": [
            "class_ids",
            "_id",
            "isActive",
            "isTeacher",
            "name",
            "surname"
          ]
        },
        {
          "type": "object",
          "properties": {
            "activityLog_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of activities the user performed",
                "example": "601bef6a25c8480b19dd54cd"
              }
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "properties": {
        "class_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "IDs of classes the user belongs to",
            "example": "601bd55f22c26a2ef9298df3"
          }
        },
        "_id": {
          "type": "string",
          "description": "User's ID",
          "example": "601be28e50364b654dec42cf"
        },
        "isActive": {
          "type": "boolean",
          "description": "Was the user's account active",
          "example": true
        },
        "isTeacher": {
          "type": "boolean",
          "description": "Is the user a teacher",
          "example": false
        },
        "name": {
          "type": "string",
          "description": "User's name",
          "example": "James"
        },
        "surname": {
          "type": "string",
          "description": "User's surname",
          "example": "Smith"
        }
      },
      "required": [
        "class_ids",
        "_id",
        "isActive",
        "isTeacher",
        "name",
        "surname"
      ]
    }
  ]
}
```

<h3 id="get__user_{userid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User's data (privacy level varies)|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to view user with specified id|[HttpException](#schemahttpexception)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified user was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__user_{userid}-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

<h1 id="fitit-api-classes">classes</h1>

Access to classes information

## get__classes

`GET /classes`

*Get all classes*

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "_id": {
        "type": "string",
        "description": "Id of the class",
        "example": "601bd55f22c26a2ef9298df3"
      },
      "name": {
        "type": "string",
        "description": "Name of the class",
        "example": "4TB"
      },
      "isActive": {
        "type": "boolean",
        "description": "Is the class active",
        "example": true
      }
    }
  }
}
```

<h3 id="get__classes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of all classes|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__classes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ClassObject](#schemaclassobject)]|false|none|none|
|» _id|string|false|none|Id of the class|
|» name|string|false|none|Name of the class|
|» isActive|boolean|false|none|Is the class active|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## get__classess_{classId}

`GET /classess/{classId}`

*Get a class by ID*

<h3 id="get__classess_{classid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|classId|path|string|true|A class unique ID|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "Id of the class",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "name": {
      "type": "string",
      "description": "Name of the class",
      "example": "4TB"
    },
    "isActive": {
      "type": "boolean",
      "description": "Is the class active",
      "example": true
    }
  }
}
```

<h3 id="get__classess_{classid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A single class|[ClassObject](#schemaclassobject)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified class ID was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__classess_{classid}-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## get__classes_{classId}_users

`GET /classes/{classId}/users`

*Get users from a class*

<h3 id="get__classes_{classid}_users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|classId|path|string|true|A class unique ID|

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "anyOf": [
      {
        "type": "object",
        "properties": {
          "class_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "IDs of classes the user belongs to",
              "example": "601bd55f22c26a2ef9298df3"
            }
          },
          "_id": {
            "type": "string",
            "description": "User's ID",
            "example": "601be28e50364b654dec42cf"
          },
          "isActive": {
            "type": "boolean",
            "description": "Was the user's account active",
            "example": true
          },
          "isTeacher": {
            "type": "boolean",
            "description": "Is the user a teacher",
            "example": false
          },
          "name": {
            "type": "string",
            "description": "User's name",
            "example": "James"
          },
          "surname": {
            "type": "string",
            "description": "User's surname",
            "example": "Smith"
          }
        },
        "required": [
          "class_ids",
          "_id",
          "isActive",
          "isTeacher",
          "name",
          "surname"
        ]
      },
      {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "class_ids": {
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "IDs of classes the user belongs to",
                  "example": "601bd55f22c26a2ef9298df3"
                }
              },
              "_id": {
                "type": "string",
                "description": "User's ID",
                "example": "601be28e50364b654dec42cf"
              },
              "isActive": {
                "type": "boolean",
                "description": "Was the user's account active",
                "example": true
              },
              "isTeacher": {
                "type": "boolean",
                "description": "Is the user a teacher",
                "example": false
              },
              "name": {
                "type": "string",
                "description": "User's name",
                "example": "James"
              },
              "surname": {
                "type": "string",
                "description": "User's surname",
                "example": "Smith"
              }
            },
            "required": [
              "class_ids",
              "_id",
              "isActive",
              "isTeacher",
              "name",
              "surname"
            ]
          },
          {
            "type": "object",
            "properties": {
              "activityLog_ids": {
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "IDs of activities the user performed",
                  "example": "601bef6a25c8480b19dd54cd"
                }
              }
            }
          }
        ]
      }
    ]
  }
}
```

<h3 id="get__classes_{classid}_users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Users belonging to a class (privacy level varies)|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to view class with specified id|[HttpException](#schemahttpexception)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified class ID was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__classes_{classid}_users-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## get__classes_{classId}_code

`GET /classes/{classId}/code`

*Generate a class-join code in human-readable format*

<h3 id="get__classes_{classid}_code-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|classId|path|string|true|A class unique ID|

> Example responses

> 200 Response

```json
"dzikie-węże"
```

<h3 id="get__classes_{classid}_code-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A class-join code in human-readable format|string|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The user does not belong to the class or is not the teacher|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified class ID was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__classes_{classid}_code-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

<h1 id="fitit-api-activitylog">activitylog</h1>

Access to activity information

## get__activitylog

`GET /activitylog`

*Get all current user's activities*

<h3 id="get__activitylog-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|onlyUnfinished|query|boolean|false|Whether to return only unfinished activities|

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "startDate": {
        "type": "string",
        "description": "Activity beggining date",
        "example": "2001-01-04T23:00:00.000Z"
      },
      "_id": {
        "type": "string",
        "description": "Activities ID",
        "example": "601bd55f22c26a2ef9298df3"
      },
      "endDate": {
        "type": "string",
        "description": "Activity end date",
        "example": "2001-01-04T23:00:00.000Z"
      },
      "activityType_id": {
        "type": "string",
        "description": "The ID of corresponding activity type",
        "example": "601bd55f22c26a2ef9298df3"
      }
    },
    "required": [
      "startDate",
      "_id",
      "activityType_id"
    ]
  }
}
```

<h3 id="get__activitylog-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An array of user's activities|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__activitylog-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ActivityLog](#schemaactivitylog)]|false|none|none|
|» startDate|string|true|none|Activity beggining date|
|» _id|string|true|none|Activities ID|
|» endDate|string|false|none|Activity end date|
|» activityType_id|string|true|none|The ID of corresponding activity type|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## post__activitylog

`POST /activitylog`

*Add a new activity*

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "activityType_id"
  ]
}
```

<h3 id="post__activitylog-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ActivityLogObject](#schemaactivitylogobject)|true|An activity object to add|
|» startDate|body|string|false|Activity beggining date|
|» endDate|body|string|false|Activity end date|
|» activityType_id|body|string|true|The ID of corresponding activity type|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "_id": {
      "type": "string",
      "description": "Activities ID",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "startDate",
    "_id",
    "activityType_id"
  ]
}
```

<h3 id="post__activitylog-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A newly created activity|[ActivityLog](#schemaactivitylog)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Validation error, no such activity type, or the endDate was earlier than the startDate|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="post__activitylog-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## get__activitylog_{activityId}

`GET /activitylog/{activityId}`

*Get a single activity by ID*

<h3 id="get__activitylog_{activityid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|activityId|path|string|true|An activities unique ID|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "_id": {
      "type": "string",
      "description": "Activities ID",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "startDate",
    "_id",
    "activityType_id"
  ]
}
```

<h3 id="get__activitylog_{activityid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Specified activity|[ActivityLog](#schemaactivitylog)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to view activity with specified id|[HttpException](#schemahttpexception)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified activity was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__activitylog_{activityid}-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

## patch__activitylog_{activityId}

`PATCH /activitylog/{activityId}`

*Change a single activity*

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "activityType_id"
  ]
}
```

<h3 id="patch__activitylog_{activityid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|activityId|path|string|true|An activities unique ID|
|body|body|[ActivityLogObject](#schemaactivitylogobject)|false|A modified activity object|
|» startDate|body|string|false|Activity beggining date|
|» endDate|body|string|false|Activity end date|
|» activityType_id|body|string|true|The ID of corresponding activity type|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "_id": {
      "type": "string",
      "description": "Activities ID",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "startDate",
    "_id",
    "activityType_id"
  ]
}
```

<h3 id="patch__activitylog_{activityid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated activity object|[ActivityLog](#schemaactivitylog)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Validation error, no such activity type, or the endDate was earlier than the startDate|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The authentication token is either invalid or is missing|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to view activity with specified id|[HttpException](#schemahttpexception)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified activity was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="patch__activitylog_{activityid}-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth, tokenInQuery, tokenInCookie
</aside>

<h1 id="fitit-api-activitytypes">activitytypes</h1>

Access to activity types information

## get__activitytypes

`GET /activitytypes`

*Get all available activity types*

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Activity type's name",
        "example": "kolarstwo"
      },
      "kcalPerHour": {
        "type": "number",
        "description": "KCal burned per hour on activity type",
        "example": 300
      },
      "_id": {
        "type": "string",
        "description": "Activity type's unique ID",
        "example": "601bd55f22c26a2ef9298df3"
      }
    }
  }
}
```

<h3 id="get__activitytypes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An array of available activity types|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<h3 id="get__activitytypes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ActivityType](#schemaactivitytype)]|false|none|none|
|» name|string|false|none|Activity type's name|
|» kcalPerHour|number|false|none|KCal burned per hour on activity type|
|» _id|string|false|none|Activity type's unique ID|

<aside class="success">
This operation does not require authentication
</aside>

## get__activitytypes_{activityTypeId}

`GET /activitytypes/{activityTypeId}`

*Get a single activity type specified by ID*

<h3 id="get__activitytypes_{activitytypeid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|activityTypeId|path|string|true|An activity type's unique ID|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Activity type's name",
      "example": "kolarstwo"
    },
    "kcalPerHour": {
      "type": "number",
      "description": "KCal burned per hour on activity type",
      "example": 300
    },
    "_id": {
      "type": "string",
      "description": "Activity type's unique ID",
      "example": "601bd55f22c26a2ef9298df3"
    }
  }
}
```

<h3 id="get__activitytypes_{activitytypeid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Activity type object|[ActivityType](#schemaactivitytype)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified activity type was not found|[HttpException](#schemahttpexception)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal error|[HttpException](#schemahttpexception)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_HttpException">HttpException</h2>
<!-- backwards compatibility -->
<a id="schemahttpexception"></a>
<a id="schema_HttpException"></a>
<a id="tocShttpexception"></a>
<a id="tocshttpexception"></a>

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "number",
      "description": "HTTP status"
    },
    "message": {
      "type": "string",
      "description": "Exception message"
    }
  },
  "required": [
    "status",
    "message"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|number|true|none|HTTP status|
|message|string|true|none|Exception message|

<h2 id="tocS_ActivityType">ActivityType</h2>
<!-- backwards compatibility -->
<a id="schemaactivitytype"></a>
<a id="schema_ActivityType"></a>
<a id="tocSactivitytype"></a>
<a id="tocsactivitytype"></a>

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Activity type's name",
      "example": "kolarstwo"
    },
    "kcalPerHour": {
      "type": "number",
      "description": "KCal burned per hour on activity type",
      "example": 300
    },
    "_id": {
      "type": "string",
      "description": "Activity type's unique ID",
      "example": "601bd55f22c26a2ef9298df3"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|Activity type's name|
|kcalPerHour|number|false|none|KCal burned per hour on activity type|
|_id|string|false|none|Activity type's unique ID|

<h2 id="tocS_ActivityLog">ActivityLog</h2>
<!-- backwards compatibility -->
<a id="schemaactivitylog"></a>
<a id="schema_ActivityLog"></a>
<a id="tocSactivitylog"></a>
<a id="tocsactivitylog"></a>

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "_id": {
      "type": "string",
      "description": "Activities ID",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "startDate",
    "_id",
    "activityType_id"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|startDate|string|true|none|Activity beggining date|
|_id|string|true|none|Activities ID|
|endDate|string|false|none|Activity end date|
|activityType_id|string|true|none|The ID of corresponding activity type|

<h2 id="tocS_ActivityLogObject">ActivityLogObject</h2>
<!-- backwards compatibility -->
<a id="schemaactivitylogobject"></a>
<a id="schema_ActivityLogObject"></a>
<a id="tocSactivitylogobject"></a>
<a id="tocsactivitylogobject"></a>

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "description": "Activity beggining date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "endDate": {
      "type": "string",
      "description": "Activity end date",
      "example": "2001-01-04T23:00:00.000Z"
    },
    "activityType_id": {
      "type": "string",
      "description": "The ID of corresponding activity type",
      "example": "601bd55f22c26a2ef9298df3"
    }
  },
  "required": [
    "activityType_id"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|startDate|string|false|none|Activity beggining date|
|endDate|string|false|none|Activity end date|
|activityType_id|string|true|none|The ID of corresponding activity type|

<h2 id="tocS_BasicUserInfo">BasicUserInfo</h2>
<!-- backwards compatibility -->
<a id="schemabasicuserinfo"></a>
<a id="schema_BasicUserInfo"></a>
<a id="tocSbasicuserinfo"></a>
<a id="tocsbasicuserinfo"></a>

```json
{
  "type": "object",
  "properties": {
    "class_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "IDs of classes the user belongs to",
        "example": "601bd55f22c26a2ef9298df3"
      }
    },
    "_id": {
      "type": "string",
      "description": "User's ID",
      "example": "601be28e50364b654dec42cf"
    },
    "isActive": {
      "type": "boolean",
      "description": "Was the user's account active",
      "example": true
    },
    "isTeacher": {
      "type": "boolean",
      "description": "Is the user a teacher",
      "example": false
    },
    "name": {
      "type": "string",
      "description": "User's name",
      "example": "James"
    },
    "surname": {
      "type": "string",
      "description": "User's surname",
      "example": "Smith"
    }
  },
  "required": [
    "class_ids",
    "_id",
    "isActive",
    "isTeacher",
    "name",
    "surname"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|class_ids|[string]|true|none|none|
|_id|string|true|none|User's ID|
|isActive|boolean|true|none|Was the user's account active|
|isTeacher|boolean|true|none|Is the user a teacher|
|name|string|true|none|User's name|
|surname|string|true|none|User's surname|

<h2 id="tocS_TeachersUserInfo">TeachersUserInfo</h2>
<!-- backwards compatibility -->
<a id="schemateachersuserinfo"></a>
<a id="schema_TeachersUserInfo"></a>
<a id="tocSteachersuserinfo"></a>
<a id="tocsteachersuserinfo"></a>

```json
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "class_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "IDs of classes the user belongs to",
            "example": "601bd55f22c26a2ef9298df3"
          }
        },
        "_id": {
          "type": "string",
          "description": "User's ID",
          "example": "601be28e50364b654dec42cf"
        },
        "isActive": {
          "type": "boolean",
          "description": "Was the user's account active",
          "example": true
        },
        "isTeacher": {
          "type": "boolean",
          "description": "Is the user a teacher",
          "example": false
        },
        "name": {
          "type": "string",
          "description": "User's name",
          "example": "James"
        },
        "surname": {
          "type": "string",
          "description": "User's surname",
          "example": "Smith"
        }
      },
      "required": [
        "class_ids",
        "_id",
        "isActive",
        "isTeacher",
        "name",
        "surname"
      ]
    },
    {
      "type": "object",
      "properties": {
        "activityLog_ids": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "IDs of activities the user performed",
            "example": "601bef6a25c8480b19dd54cd"
          }
        }
      }
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[BasicUserInfo](#schemabasicuserinfo)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» activityLog_ids|[string]|false|none|none|

<h2 id="tocS_PrivateUserInfo">PrivateUserInfo</h2>
<!-- backwards compatibility -->
<a id="schemaprivateuserinfo"></a>
<a id="schema_PrivateUserInfo"></a>
<a id="tocSprivateuserinfo"></a>
<a id="tocsprivateuserinfo"></a>

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "class_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of classes the user belongs to",
                "example": "601bd55f22c26a2ef9298df3"
              }
            },
            "_id": {
              "type": "string",
              "description": "User's ID",
              "example": "601be28e50364b654dec42cf"
            },
            "isActive": {
              "type": "boolean",
              "description": "Was the user's account active",
              "example": true
            },
            "isTeacher": {
              "type": "boolean",
              "description": "Is the user a teacher",
              "example": false
            },
            "name": {
              "type": "string",
              "description": "User's name",
              "example": "James"
            },
            "surname": {
              "type": "string",
              "description": "User's surname",
              "example": "Smith"
            }
          },
          "required": [
            "class_ids",
            "_id",
            "isActive",
            "isTeacher",
            "name",
            "surname"
          ]
        },
        {
          "type": "object",
          "properties": {
            "activityLog_ids": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "IDs of activities the user performed",
                "example": "601bef6a25c8480b19dd54cd"
              }
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email address",
          "example": "email@example.com"
        },
        "birthDate": {
          "type": "string",
          "description": "User's date of birth",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "dateCreated": {
          "type": "string",
          "description": "The date of account's creation",
          "example": "2021-02-04T12:03:26.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 182
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        }
      },
      "required": [
        "email",
        "dateCreated"
      ]
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[TeachersUserInfo](#schemateachersuserinfo)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» email|string|true|none|User's email address|
|» birthDate|string|false|none|User's date of birth|
|» dateCreated|string|true|none|The date of account's creation|
|» height|number|false|none|User's height|
|» weight|number|false|none|User's weight|

<h2 id="tocS_TokenObject">TokenObject</h2>
<!-- backwards compatibility -->
<a id="schematokenobject"></a>
<a id="schema_TokenObject"></a>
<a id="tocStokenobject"></a>
<a id="tocstokenobject"></a>

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFiZTI4ZTUwMzY0YjY1NGRlYzQyY2YiLCJpYXQiOjE2MTMxMjQyMTksImV4cCI6MTYxMzcyOTAxOX0.FC_DqIJewnn01qL3LdYumNaiLY8W5yEmAhQ7ahkbGqw"

```

Authorization JWT token

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Authorization JWT token|

<h2 id="tocS_LoginData">LoginData</h2>
<!-- backwards compatibility -->
<a id="schemalogindata"></a>
<a id="schema_LoginData"></a>
<a id="tocSlogindata"></a>
<a id="tocslogindata"></a>

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "description": "User's email",
      "example": "email@example.com"
    },
    "password": {
      "type": "string",
      "description": "User's password",
      "example": "qwerty2137"
    }
  },
  "required": [
    "email",
    "password"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|User's email|
|password|string|true|none|User's password|

<h2 id="tocS_RegistrationData">RegistrationData</h2>
<!-- backwards compatibility -->
<a id="schemaregistrationdata"></a>
<a id="schema_RegistrationData"></a>
<a id="tocSregistrationdata"></a>
<a id="tocsregistrationdata"></a>

```json
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "User's email",
          "example": "email@example.com"
        },
        "password": {
          "type": "string",
          "description": "User's password",
          "example": "qwerty2137"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "User's name",
          "example": "James"
        },
        "surname": {
          "type": "string",
          "description": "User's surname",
          "example": "Smith"
        },
        "classId": {
          "type": "string",
          "description": "Unique human-readable identifier of a class",
          "example": "dzikie-węże"
        },
        "birthDate": {
          "type": "string",
          "description": "User's birth date",
          "example": "2001-01-04T23:00:00.000Z"
        },
        "height": {
          "type": "number",
          "description": "User's height",
          "example": 180
        },
        "weight": {
          "type": "number",
          "description": "User's weight",
          "example": 60
        },
        "isTeacher": {
          "type": "boolean",
          "description": "Is user a teacher",
          "example": false
        }
      },
      "required": [
        "name",
        "surname",
        "classId"
      ]
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[LoginData](#schemalogindata)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» name|string|true|none|User's name|
|» surname|string|true|none|User's surname|
|» classId|string|true|none|Unique human-readable identifier of a class|
|» birthDate|string|false|none|User's birth date|
|» height|number|false|none|User's height|
|» weight|number|false|none|User's weight|
|» isTeacher|boolean|false|none|Is user a teacher|

<h2 id="tocS_ClassObject">ClassObject</h2>
<!-- backwards compatibility -->
<a id="schemaclassobject"></a>
<a id="schema_ClassObject"></a>
<a id="tocSclassobject"></a>
<a id="tocsclassobject"></a>

```json
{
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "Id of the class",
      "example": "601bd55f22c26a2ef9298df3"
    },
    "name": {
      "type": "string",
      "description": "Name of the class",
      "example": "4TB"
    },
    "isActive": {
      "type": "boolean",
      "description": "Is the class active",
      "example": true
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|_id|string|false|none|Id of the class|
|name|string|false|none|Name of the class|
|isActive|boolean|false|none|Is the class active|

