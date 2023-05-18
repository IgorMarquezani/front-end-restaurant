
function renderNotificationList() {
    var notifications = [];
    fetch(`http://localhost:3300/api/user/invites`)
      .then(response => response.json())
      .then(data => {
        // Process the received data
        
        var invite = Object.values(data);
        console.log(invite)
        invite.forEach(data => {
          notifications.push([
            data.id,
            data.target,
            data.inviting_room,
            data.status,
            data.permission,
        ])
        });
        
        var container = document.getElementById('notificationContainer');
      var button = document.getElementById('notificationButton');
      
      // Clear existing notifications
      container.innerHTML = '';
      
      // If the notification list is already visible, hide it
      if (container.style.display === 'block') {
        container.style.display = 'none';
        return;
      }
      
      
      console.log(notifications);
      console.log(notifications.length);
      if(notifications.length > 0 ){
      for (var i = 0; i < notifications.length; i++) {
        var notification = document.createElement('div');
        notification.className = 'notification-item';

        var dot = document.createElement('div');
        dot.className = 'notification-dot ' + (notifications[i][3] == "not aceppeted" ? 'notification-dot-false' : 'notification-dot-true');

        var text = document.createElement('div');
        text.className = 'notification-text';
        text.textContent = `Convite ${notifications[i][0]}`;
        text.id = notifications[i][0];

        var acceptButton = document.createElement('button');
        acceptButton.className = 'btn alert-success';
        acceptButton.textContent = 'Accept';
        acceptButton.setAttribute('onclick', `acceptInvite()`);

        var declineButton = document.createElement('button');
        declineButton.className = 'btn alert-danger';
        declineButton.textContent = 'Decline';
        declineButton.setAttribute('onclick', `declineInvite()`);
        declineButton.id = notifications[i][0];
        notification.appendChild(dot);
        notification.appendChild(text);
        notification.appendChild(acceptButton);
        notification.appendChild(declineButton);

        container.appendChild(notification);
      }
    }
    else{
      var notification = document.createElement('div');
        notification.className = 'notification-item';

        var text = document.createElement('div');
        text.className = 'notification-text';
        text.textContent = 'Nao ha convites';

        notification.appendChild(text);

        container.appendChild(notification);
    }
      // Adjust container size and position
      var containerHeight = notification.length * 30 + 20; // Calculate height based on notification count
      container.style.height = containerHeight + 'px';
      container.style.width = 300 + 'px'
      container.style.display = 'block';
      container.style.top = button.offsetHeight + 10 + 'px';

      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });

    }

    function acceptInvite() {
        console.log('aqui')
        const button = event.target;
        const notificationText = button.previousElementSibling;
        const id = notificationText.getAttribute('id');
      
        const endpoint = `http://localhost:3300/api/invite/accept/${id}`;
      
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => {
            // Process the response as needed
            console.log('Invite accepted successfully!');
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
          });
      }
      function declineInvite() {
        console.log('aqui')
        const button = event.target;
      
        const id = button.getAttribute(`id`);
      
        const endpoint = `http://localhost:3300/api/invite/decline/${id}`;
      
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => {
            // Process the response as needed
            console.log('Invite accepted successfully!');
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
          });
      }
