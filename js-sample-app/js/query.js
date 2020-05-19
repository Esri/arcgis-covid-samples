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

const grades = ["A","B","C","D","F"];

const whereClauseBuilder = (sliderValues, attribute) => {
  let query = "";
  const tempArray = grades.slice(sliderValues[0],sliderValues[1] + 1);
  tempArray.forEach( e => {
    if(e == grades[sliderValues[1]]){
      query += attribute + "='" + e + "'";
    }
    else {
      query += attribute + "='" + e +"' OR ";
    }
  })

  return query;

}

export {
  whereClauseBuilder
}