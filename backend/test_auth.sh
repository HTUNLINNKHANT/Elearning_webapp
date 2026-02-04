#!/bin/bash

echo "=== Testing Authentication API ==="
echo ""

# Test Registration
echo "1. Testing Student Registration..."
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"New Student","email":"newstudent@test.com","password":"password123","password_confirmation":"password123"}' \
  -s | jq '.'
echo ""

# Test Login
echo "2. Testing Login..."
LOGIN_RESPONSE=$(curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@japaneselanguage.com","password":"admin123"}' \
  -s)
echo $LOGIN_RESPONSE | jq '.'
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo ""

# Test Get Current User
echo "3. Testing Get Current User (Protected Route)..."
curl -X GET http://localhost:8000/api/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -s | jq '.'
echo ""

# Test Logout
echo "4. Testing Logout..."
curl -X POST http://localhost:8000/api/logout \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -s | jq '.'
echo ""

echo "=== Tests Complete ==="
