<h1>🍴 Recipe Explorer App</h1>

  <p><strong>Description:</strong> The Recipe Explorer App is a mobile application built with React Native and Expo. It allows users to browse, save, and view details of random recipes fetched from a public API. The app features user authentication, recipe management, and a floating button to track saved recipes.</p>

  <h2>✨ Features</h2>
  <ul>
    <li><strong>User Authentication:</strong> Sign Up and Sign In pages with mock user data. The username is displayed on the Home screen after login.</li>
    <li><strong>Recipe Management:</strong> Displays a list of 20 random recipes in card view, including an image, title, description, and status (Vegetarian/Non-Vegetarian).</li>
    <li><strong>Save Recipes:</strong> Users can save recipes for later viewing, and a floating button shows the count of saved recipes.</li>
    <li><strong>Recipe Detail Page:</strong> Detailed recipe page with an image, title, category, cuisine, and cooking instructions.</li>
    <li><strong>State Management:</strong> Uses Context API to manage user data, saved recipes, and the recipe ID for detail views.</li>
  </ul>

  <h2>⚙️ System Requirements</h2>
  <ul>
    <li><strong>Node.js:</strong> LTS version recommended</li>
    <li><strong>npm or yarn:</strong> To install dependencies</li>
    <li><strong>Expo CLI:</strong> Install globally using <code>npm install -g expo-cli</code></li>
    <li><strong>Public API:</strong> [TheMealDB](https://www.themealdb.com/api.php)</li>
  </ul>

  <h2>📋 Setup Instructions</h2>
  <ol>
    <li><strong>Clone the Repository:</strong>
      <pre><code>git clone <repository-url></code></pre>
      <pre><code>cd HealthyMeal</code></pre>
    </li>
    <li><strong>Install Dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Start the Development Server:</strong>
      <pre><code>npx expo start</code></pre>
    </li>
    <li><strong>Run on Device or Emulator:</strong>
      <ul>
        <li>Use the Expo Go app (iOS/Android).</li>
        <li>Run on a simulator/emulator.</li>
      </ul>
    </li>
    <li><strong>Set API Key:</strong> Replace <code>"YOUR_API_KEY"</code> in the code with your API key from <a href="https://www.themealdb.com/api.php" target="_blank">TheMealDB</a>.</li>
  </ol>

  <h2>🛠️ Commands</h2>
  <ul>
    <li><strong>Start the project:</strong>
      <pre><code>npx expo start</code></pre>
    </li>
    <li><strong>Install a package:</strong>
      <pre><code>npm install &lt;package-name&gt;</code></pre>
    </li>
    <li><strong>Clear cache:</strong>
      <pre><code>npx expo start -c</code></pre>
    </li>
  </ul>

  <h2>🌐 API Reference</h2>
  <ul>
    <li><strong>Public API Used:</strong> <a href="https://www.themealdb.com/api.php" target="_blank">TheMealDB</a></li>
    <li><strong>Endpoints:</strong>
      <ul>
        <li>Random Recipe: <code>https://www.themealdb.com/api/json/v1/1/random.php</code></li>
        <li>Recipe Details: <code>https://www.themealdb.com/api/json/v1/1/lookup.php?i=&lt;id&gt;</code></li>
      </ul>
    </li>
  </ul>

  <h2>👩‍💻 Note</h2>
  <p>This project was developed as part of a mobile app development assignment to demonstrate proficiency in React Native, Expo, Context API, and public API integration.</p>
