# Middleware Service - Places


// API Calls

// Working

Nearby places : location, keyword, [radius]

  - GET /nearby?location= &keyword= [&radius=]

Returns list of nearby locations based on the keyword. Can optionally specify
radius.

Returns an JSON object in the format:
{ results: [googleResponses] }
and is sorted by rating

--------------------

Nearby suggestion : location, keyword, [radius]

  - GET /suggestion?location= &keyword= [&radius=]

Selects a random nearby location based on keyword submitted. Can optionally
specify radius

Returns an JSON object in the format:
{ results: [googleResponses] }
Contains one result


---------------------

// In Progress

Create a trip: location

  - GET /create_trip?location=

Returns an JSON object in the format:
{ results: [googleResponses] }

Currently returns a historical landmark, followed by a bar. Both of these
locations are chosen at random. Each locations is within 500m of previous
location.

------------------------------


// To Do

Nearby places : userID, location

  - GET /nearby/:userID?location=

Nearby places (trip) : userID, location, number of stops

  - GET /create_trip/:userID?location= &stops=





Example Google Places response:

    {
        "geometry": {
            "location": {
                "lat": 51.8952592,
                "lng": -8.4725253
            },
            "viewport": {
                "northeast": {
                    "lat": 51.89661037989272,
                    "lng": -8.471183270107279
                },
                "southwest": {
                    "lat": 51.89391072010727,
                    "lng": -8.473882929892723
                }
            }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
        "id": "95f4832fab2e2d8bfc5a38093c9de5d658ae5604",
        "name": "The Laurel Bar",
        "photos": [
            {
                "height": 3058,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/105453233671906425261/photos\">Liam Mackey</a>"
                ],
                "photo_reference": "CmRaAAAAq5OVRkLCYSgFO0ZTb0hTI9KjPYjvdwasiYAATzRpf5Q9UmdmkfAVGL4UcKrSDH62Iq02feO0pfkOoLnd1MWCRmmJbVrzbLaIL4Yu3SNNQTgz5Tqz23gm7M8aCg1Iu7eMEhCR7QqmUHPUuIVHRCZb4RZzGhTsndf37T7ARi6vrWarq4Vvxjhibg",
                "width": 2294
            }
        ],
        "place_id": "ChIJz2z98RqQREgR8Act4UtuWwI",
        "rating": 5,
        "reference": "CmRbAAAAONV94oiD4BVBi7idC_FAc-Hu4YrMtHqQg06yrpmXz9DaFN8FzWm8r-8Girwk8uHl3CQKYuApdbgBkz_XKoWiPjOBXXJcX1VM0zj6SVVLFn4SUk3ah6CfeS8DFiYbh47KEhDalrYGPLjSPI-p5gDIYNh9GhTxVQI5w5huZFWFIQzytwa9XzdJZg",
        "scope": "GOOGLE",
        "types": [
            "bar",
            "point_of_interest",
            "establishment"
        ],
        "vicinity": ""
    },
