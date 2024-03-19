# Generated by Django 4.0.3 on 2024-03-19 05:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0002_automobile_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobile',
            name='manufacturer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='automobiles', to='inventory_rest.manufacturer'),
        ),
    ]
