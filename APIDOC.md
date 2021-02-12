---
title: FitIT API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
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

> Code samples

```shell
# You can also use wget
curl -X POST https://api.fitit.tk/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST https://api.fitit.tk/api/v1/auth/login HTTP/1.1
Host: api.fitit.tk
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "email@example.com",
  "password": "qwerty2137"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://api.fitit.tk/api/v1/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.fitit.tk/api/v1/auth/login',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://api.fitit.tk/api/v1/auth/login', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://api.fitit.tk/api/v1/auth/login', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/auth/login");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://api.fitit.tk/api/v1/auth/login", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/login`

*Authorize and get a token*

> Body parameter

```json
{
  "email": "email@example.com",
  "password": "qwerty2137"
}
```

<h3 id="post__auth_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginData](#schemalogindata)|true|User's email and password|

> Example responses

> 200 Response

```json
{
  "user": {
    "class_ids": [
      "601bd55f22c26a2ef9298df3"
    ],
    "_id": "601be28e50364b654dec42cf",
    "isActive": true,
    "isTeacher": false,
    "name": "James",
    "surname": "Smith",
    "activityLog_ids": [
      "601bef6a25c8480b19dd54cd"
    ],
    "email": "email@example.com",
    "birthDate": "2001-01-04T23:00:00.000Z",
    "dateCreated": "2021-02-04T12:03:26.000Z",
    "height": 182,
    "weight": 60
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFiZTI4ZTUwMzY0YjY1NGRlYzQyY2YiLCJpYXQiOjE2MTMxMjQyMTksImV4cCI6MTYxMzcyOTAxOX0.FC_DqIJewnn01qL3LdYumNaiLY8W5yEmAhQ7ahkbGqw"
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

> Code samples

```shell
# You can also use wget
curl -X POST https://api.fitit.tk/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST https://api.fitit.tk/api/v1/auth/register HTTP/1.1
Host: api.fitit.tk
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "email@example.com",
  "password": "qwerty2137",
  "name": "James",
  "surname": "Smith",
  "classId": "dzikie-węże",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "height": 180,
  "weight": 60,
  "isTeacher": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://api.fitit.tk/api/v1/auth/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.fitit.tk/api/v1/auth/register',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://api.fitit.tk/api/v1/auth/register', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://api.fitit.tk/api/v1/auth/register', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/auth/register");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://api.fitit.tk/api/v1/auth/register", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /auth/register`

*Register a user*

> Body parameter

```json
{
  "email": "email@example.com",
  "password": "qwerty2137",
  "name": "James",
  "surname": "Smith",
  "classId": "dzikie-węże",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "height": 180,
  "weight": 60,
  "isTeacher": false
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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
  ],
  "email": "email@example.com",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "dateCreated": "2021-02-04T12:03:26.000Z",
  "height": 182,
  "weight": 60
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/user \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/user HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/user',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/user',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/user', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /user`

*Get current user's information*

> Example responses

> 200 Response

```json
{
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
  ],
  "email": "email@example.com",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "dateCreated": "2021-02-04T12:03:26.000Z",
  "height": 182,
  "weight": 60
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

> Code samples

```shell
# You can also use wget
curl -X PATCH https://api.fitit.tk/api/v1/user \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH https://api.fitit.tk/api/v1/user HTTP/1.1
Host: api.fitit.tk
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "email": "email@example.com",
  "password": "qwerty2137",
  "name": "James",
  "surname": "Smith",
  "classId": "dzikie-węże",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "height": 180,
  "weight": 60,
  "isTeacher": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/user',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'https://api.fitit.tk/api/v1/user',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('https://api.fitit.tk/api/v1/user', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','https://api.fitit.tk/api/v1/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "https://api.fitit.tk/api/v1/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /user`

*Update user's current information*

> Body parameter

```json
{
  "email": "email@example.com",
  "password": "qwerty2137",
  "name": "James",
  "surname": "Smith",
  "classId": "dzikie-węże",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "height": 180,
  "weight": 60,
  "isTeacher": false
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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
  ],
  "email": "email@example.com",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "dateCreated": "2021-02-04T12:03:26.000Z",
  "height": 182,
  "weight": 60
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

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.fitit.tk/api/v1/user \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE https://api.fitit.tk/api/v1/user HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/user',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'https://api.fitit.tk/api/v1/user',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('https://api.fitit.tk/api/v1/user', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://api.fitit.tk/api/v1/user', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/user");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://api.fitit.tk/api/v1/user", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /user`

*Delete user's account*

> Example responses

> 401 Response

```json
null
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/user/{userId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/user/{userId} HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/user/{userId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/user/{userId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/user/{userId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/user/{userId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/user/{userId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/user/{userId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
  ],
  "email": "email@example.com",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "dateCreated": "2021-02-04T12:03:26.000Z",
  "height": 182,
  "weight": 60
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/classes \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/classes HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/classes',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/classes',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/classes', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/classes', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/classes");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/classes", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /classes`

*Get all classes*

> Example responses

> 200 Response

```json
[
  {
    "_id": "601bd55f22c26a2ef9298df3",
    "name": "4TB",
    "isActive": true
  }
]
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/classess/{classId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/classess/{classId} HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/classess/{classId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/classess/{classId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/classess/{classId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/classess/{classId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/classess/{classId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/classess/{classId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

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
  "_id": "601bd55f22c26a2ef9298df3",
  "name": "4TB",
  "isActive": true
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/classes/{classId}/users \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/classes/{classId}/users HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/classes/{classId}/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/classes/{classId}/users',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/classes/{classId}/users', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/classes/{classId}/users', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/classes/{classId}/users");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/classes/{classId}/users", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /classes/{classId}/users`

*Get users from a class*

<h3 id="get__classes_{classid}_users-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|classId|path|string|true|A class unique ID|

> Example responses

> 200 Response

```json
[
  {
    "class_ids": [
      "601bd55f22c26a2ef9298df3"
    ],
    "_id": "601be28e50364b654dec42cf",
    "isActive": true,
    "isTeacher": false,
    "name": "James",
    "surname": "Smith"
  }
]
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/classes/{classId}/code \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/classes/{classId}/code HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/classes/{classId}/code',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/classes/{classId}/code',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/classes/{classId}/code', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/classes/{classId}/code', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/classes/{classId}/code");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/classes/{classId}/code", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/activitylog \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/activitylog HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/activitylog',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/activitylog',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/activitylog', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/activitylog', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitylog");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/activitylog", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /activitylog`

*Get all current user's activities*

<h3 id="get__activitylog-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|onlyUnfinished|query|boolean|false|Whether to return only unfinished activities|

> Example responses

> 200 Response

```json
[
  {
    "startDate": "2001-01-04T23:00:00.000Z",
    "_id": "601bd55f22c26a2ef9298df3",
    "endDate": "2001-01-04T23:00:00.000Z",
    "activityType_id": "601bd55f22c26a2ef9298df3"
  }
]
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

> Code samples

```shell
# You can also use wget
curl -X POST https://api.fitit.tk/api/v1/activitylog \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST https://api.fitit.tk/api/v1/activitylog HTTP/1.1
Host: api.fitit.tk
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "startDate": "2001-01-04T23:00:00.000Z",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/activitylog',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'https://api.fitit.tk/api/v1/activitylog',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('https://api.fitit.tk/api/v1/activitylog', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://api.fitit.tk/api/v1/activitylog', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitylog");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://api.fitit.tk/api/v1/activitylog", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /activitylog`

*Add a new activity*

> Body parameter

```json
{
  "startDate": "2001-01-04T23:00:00.000Z",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
}
```

<h3 id="post__activitylog-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ActivityLogObject](#schemaactivitylogobject)|true|An activity object to add|

> Example responses

> 200 Response

```json
{
  "startDate": "2001-01-04T23:00:00.000Z",
  "_id": "601bd55f22c26a2ef9298df3",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/activitylog/{activityId} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET https://api.fitit.tk/api/v1/activitylog/{activityId} HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/activitylog/{activityId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/activitylog/{activityId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('https://api.fitit.tk/api/v1/activitylog/{activityId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/activitylog/{activityId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitylog/{activityId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/activitylog/{activityId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

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
  "startDate": "2001-01-04T23:00:00.000Z",
  "_id": "601bd55f22c26a2ef9298df3",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
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

> Code samples

```shell
# You can also use wget
curl -X PATCH https://api.fitit.tk/api/v1/activitylog/{activityId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PATCH https://api.fitit.tk/api/v1/activitylog/{activityId} HTTP/1.1
Host: api.fitit.tk
Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "startDate": "2001-01-04T23:00:00.000Z",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('https://api.fitit.tk/api/v1/activitylog/{activityId}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.patch 'https://api.fitit.tk/api/v1/activitylog/{activityId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.patch('https://api.fitit.tk/api/v1/activitylog/{activityId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','https://api.fitit.tk/api/v1/activitylog/{activityId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitylog/{activityId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "https://api.fitit.tk/api/v1/activitylog/{activityId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /activitylog/{activityId}`

*Change a single activity*

> Body parameter

```json
{
  "startDate": "2001-01-04T23:00:00.000Z",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
}
```

<h3 id="patch__activitylog_{activityid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|activityId|path|string|true|An activities unique ID|
|body|body|[ActivityLogObject](#schemaactivitylogobject)|false|A modified activity object|

> Example responses

> 200 Response

```json
{
  "startDate": "2001-01-04T23:00:00.000Z",
  "_id": "601bd55f22c26a2ef9298df3",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/activitytypes \
  -H 'Accept: application/json'

```

```http
GET https://api.fitit.tk/api/v1/activitytypes HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://api.fitit.tk/api/v1/activitytypes',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/activitytypes',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.fitit.tk/api/v1/activitytypes', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/activitytypes', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitytypes");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/activitytypes", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /activitytypes`

*Get all available activity types*

> Example responses

> 200 Response

```json
[
  {
    "name": "kolarstwo",
    "kcalPerHour": 300,
    "_id": "601bd55f22c26a2ef9298df3"
  }
]
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

> Code samples

```shell
# You can also use wget
curl -X GET https://api.fitit.tk/api/v1/activitytypes/{activityTypeId} \
  -H 'Accept: application/json'

```

```http
GET https://api.fitit.tk/api/v1/activitytypes/{activityTypeId} HTTP/1.1
Host: api.fitit.tk
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://api.fitit.tk/api/v1/activitytypes/{activityTypeId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

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
  "name": "kolarstwo",
  "kcalPerHour": 300,
  "_id": "601bd55f22c26a2ef9298df3"
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
  "status": 0,
  "message": "string"
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
  "name": "kolarstwo",
  "kcalPerHour": 300,
  "_id": "601bd55f22c26a2ef9298df3"
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
  "startDate": "2001-01-04T23:00:00.000Z",
  "_id": "601bd55f22c26a2ef9298df3",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
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
  "startDate": "2001-01-04T23:00:00.000Z",
  "endDate": "2001-01-04T23:00:00.000Z",
  "activityType_id": "601bd55f22c26a2ef9298df3"
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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith"
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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
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
  "class_ids": [
    "601bd55f22c26a2ef9298df3"
  ],
  "_id": "601be28e50364b654dec42cf",
  "isActive": true,
  "isTeacher": false,
  "name": "James",
  "surname": "Smith",
  "activityLog_ids": [
    "601bef6a25c8480b19dd54cd"
  ],
  "email": "email@example.com",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "dateCreated": "2021-02-04T12:03:26.000Z",
  "height": 182,
  "weight": 60
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
  "email": "email@example.com",
  "password": "qwerty2137"
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
  "email": "email@example.com",
  "password": "qwerty2137",
  "name": "James",
  "surname": "Smith",
  "classId": "dzikie-węże",
  "birthDate": "2001-01-04T23:00:00.000Z",
  "height": 180,
  "weight": 60,
  "isTeacher": false
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
  "_id": "601bd55f22c26a2ef9298df3",
  "name": "4TB",
  "isActive": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|_id|string|false|none|Id of the class|
|name|string|false|none|Name of the class|
|isActive|boolean|false|none|Is the class active|

