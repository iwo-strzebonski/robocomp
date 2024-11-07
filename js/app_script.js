//Google AppScript
//Not sure Where to put this file, but I think It should be stored somewhere on out repo, I am open for suggestions

/**
 * Send form data to an API endpoint
 * @param e Form response event
 * @param apiUrl URL to send the form data to
 * @example
 * const API_URL = 'https://api.example.com'
 *
 * function onFormSubmit(e) {
 *   submitForm(e, API_URL)
 * }
 */
function submitForm(e, apiUrl) {
  const response = e.response
  const itemResponses = response.getItemResponses()
  const formResponse = {}
  const email = response.getRespondentEmail()

  itemResponses.forEach((itemResponses) => {
    const itemTitle = itemResponses.getItem().getId()
    const value = itemResponses.getResponse()
    formResponse[itemTitle] = value
  })

  // Simplest way to do it, everything should work nicely if the form works as it is supposed to
  // MAKE SURE ANY CHANGES IN FORM ARE ALSO MADE HERE
  const emails = [
    email,
    formResponse['1380062988'],
    formResponse['1169491911'],
    formResponse['464434576'],
    formResponse['246166203']
  ]
  const names = [
    formResponse['1287848497'],
    formResponse['303741596'],
    formResponse['1260942526'],
    formResponse['1175920491'],
    formResponse['1715581166']
  ]
  const lastNames = [
    formResponse['1396884241'],
    formResponse['283820899'],
    formResponse['1430971921'],
    formResponse['1859176448'],
    formResponse['962827902']
  ]
  const tel_numbers = [
    formResponse['1863773608'],
    formResponse['1447808650'],
    formResponse['356176314'],
    formResponse['164820149'],
    formResponse['1813353282']
  ]
  const streets = [
    formResponse['578584106'],
    formResponse['1650218021'],
    formResponse['491664188'],
    formResponse['1215249220'],
    formResponse['1601712798']
  ]
  const towns = [
    formResponse['1762436307'],
    formResponse['1848747240'],
    formResponse['1439787581'],
    formResponse['62200889'],
    formResponse['999678764']
  ]
  const postalCodes = [
    formResponse['2073853740'],
    formResponse['1160686151'],
    formResponse['2114111042'],
    formResponse['1826467802'],
    formResponse['1610364098']
  ]
  const countries = [
    formResponse['597996786'],
    formResponse['1706601837'],
    formResponse['1958060022'],
    formResponse['346977336'],
    formResponse['1452469857']
  ]
  const participants = []

  for (var i = 0; i < formResponse['1652360394']; i++) {
    participants.push({
      email: emails[i],
      first_name: names[i],
      last_name: lastNames[i],
      phone: tel_numbers[i],
      street_address: streets[i],
      admin_level_2: towns[i],
      postal_code: postalCodes[i],
      country: countries[i]
    })
  }

  const robotNames = [formResponse['41413901'], formResponse['1754831184'], formResponse['149992907']]
  const robotCompetitions = [formResponse['320180773'], formResponse['561738399'], formResponse['1090064681']]
  const competitionDict = {
    'Standard Sumo': 'sumo-standard',
    'LEGO Sumo': 'sumo-lego',
    'Mini Sumo': 'sumo-mini',
    'Mikro Sumo': 'sumo-micro',
    'Mini Smash Bot': 'smashbot-mini',
    'Freestyle': 'freestyle',
    'Line Follower Standard': 'linefollower-standard',
    'Line Follower Enhanced': 'linefollower-enhanced',
    'Micromouse': 'micromouse',
    'Robosprint': 'robosprint'
  }

  const robots = []

  for (var i = 0; i < formResponse['1436390431']; i++) {
    robots.push({
      name: robotNames[i],
      competition: competitionDict[robotCompetitions[i]]
    })
  }

  const formatedData = {
    team_name: formResponse['555300143'],
    participants,
    robots
  }

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(formatedData)
  }
  Logger.log(JSON.stringify(formatedData))

  try {
    const response = UrlFetchApp.fetch(apiUrl, options)
    Logger.log('Form data sent successfully: ' + response.getContentText())
  } catch (error) {
    Logger.log('Error sending form data: ' + error.toString())
  }
}
