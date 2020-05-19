/*
  Copyright 2020 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/

/* 
  For demonstration purposes we override the feature layer's renderer and labelingInfo to
  show how all the properties work. You'll notice there are syntactical differences between the
  JSON here and what's in the actual feature layer - you can't just copy and paste you have to
  use the properties defined in the ArcGIS API for Javascript's SDK documentation.

  You can view the original renderer and labelingInfo by going to the FeatureLayer URL that's 
  defined in config.js.
*/

const renderer = {
  "type": "unique-value",
  "field": "grade_distance",
  "legendOptions": {
    "title": "Distancing Grade"
  },
  "defaultLabel": "Other",
  "defaultSymbol": {
    "type": "simple-fill",
    "color": [
      170,
      170,
      170,
      255
    ],
    "outline": {
      "type": "simple-line",
      "color": [
        153,
        153,
        153,
        64
      ],
      "width": 0.75,
      "style": "solid"
    },
    "style": "solid"
  },
  "uniqueValueInfos": [
    {
      "label": "A",
      "symbol": {
        "type": "simple-fill",
        "color": [
          0,
          77,
          168,
          255
        ],
        "outline": {
          "type": "simple-line",
          "color": [
            235,
            235,
            235,
            191
          ],
          "width": 0.75,
          "style": "solid"
        },
        "style": "solid"
      },
      "value": "A"
    },
    // {
    //   "label": "A-",
    //   "symbol": {
    //     "type": "simple-fill",
    //     "color": [
    //       0,
    //       112,
    //       255,
    //       255
    //     ],
    //     "outline": {
    //       "type": "simple-line",
    //       "color": [
    //         235,
    //         235,
    //         235,
    //         191
    //       ],
    //       "width": 0.75,
    //       "style": "solid"
    //     },
    //     "style": "solid"
    //   },
    //   "value": "A-"
    // },
    {
      "label": "B",
      "symbol": {
        "type": "simple-fill",
        "color": [
          115,
          178,
          255,
          255
        ],
        "outline": {
          "type": "simple-line",
          "color": [
            235,
            235,
            235,
            191
          ],
          "width": 0.75,
          "style": "solid"
        },
        "style": "solid"
      },
      "value": "B"
    },
    // {
    //   "label": "B-",
    //   "symbol": {
    //     "type": "simple-fill",
    //     "color": [
    //       190,
    //       232,
    //       255,
    //       255
    //     ],
    //     "outline": {
    //       "type": "simple-line",
    //       "color": [
    //         235,
    //         235,
    //         235,
    //         191
    //       ],
    //       "width": 0.75,
    //       "style": "solid"
    //     },
    //     "style": "solid"
    //   },
    //   "value": "B-"
    // },
    {
      "label": "C",
      "symbol": {
        "type": "simple-fill",
        "color": [
          255,
          255,
          190,
          255
        ],
        "outline": {
          "type": "simple-line",
          "color": [
            235,
            235,
            235,
            191
          ],
          "width": 0.75,
          "style": "solid"
        },
        "style": "solid"
      },
      "value": "C"
    },
    // {
    //   "label": "C-",
    //   "symbol": {
    //     "type": "simple-fill",
    //     "color": [
    //       255,
    //       211,
    //       127,
    //       255
    //     ],
    //     "outline": {
    //       "type": "simple-line",
    //       "color": [
    //         235,
    //         235,
    //         235,
    //         191
    //       ],
    //       "width": 0.75,
    //       "style": "solid"
    //     },
    //     "style": "solid"
    //   },
    //   "value": "C-"
    // },
    {
      "label": "D",
      "symbol": {
        "type": "simple-fill",
        "color": [
          255,
          170,
          0,
          255
        ],
        "outline": {
          "type": "simple-line",
          "color": [
            235,
            235,
            235,
            191
          ],
          "width": 0.75,
          "style": "solid"
        },
        "style": "solid"
      },
      "value": "D"
    },
    // {
    //   "label": "D-",
    //   "symbol": {
    //     "type": "simple-fill",
    //     "color": [
    //       255,
    //       0,
    //       0,
    //       255
    //     ],
    //     "outline": {
    //       "type": "simple-line",
    //       "color": [
    //         235,
    //         235,
    //         235,
    //         191
    //       ],
    //       "width": 0.75,
    //       "style": "solid"
    //     },
    //     "style": "solid"
    //   },
    //   "value": "D-"
    // },
    {
      "label": "F",
      "symbol": {
        "type": "simple-fill",
        "color": [
          230,
          0,
          0,
          255
        ],
        "outline": {
          "type": "simple-line",
          "color": [
            235,
            235,
            235,
            191
          ],
          "width": 0.75,
          "style": "solid"
        },
        "style": "solid"
      },
      "value": "F"
    }
  ]
}

const labelingInfo = [
  {
    "labelExpression": null,
    "labelExpressionInfo": {
      "expression": "$feature[\"grade_distance\"]",
      "value": "{grade_distance}"
    },
    "useCodedValues": true,
    "maxScale": 0,
    "minScale": 6584354,
    "where": null,
    "labelPlacement": "always-horizontal",
    "symbol": {
      "color": [
        255,
        255,
        255,
        255
      ],
      "type": "text",
      "backgroundColor": null,
      "borderLineColor": null,
      "haloSize": 0.75,
      "haloColor": [
        192,
        192,
        192,
        255
      ],
      "horizontalAlignment": "center",
      "rightToLeft": false,
      "angle": 0,
      "xoffset": 0,
      "yoffset": 0,
      "text": "",
      "rotated": false,
      "kerning": true,
      "font": {
        "size": 13.5,
        "style": "normal",
        "decoration": "none",
        "weight": "bold",
        "family": "Arial"
      }
    }
  }
]

export {
  renderer, labelingInfo
}